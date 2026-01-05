/**
 * Rate Limit Tests for Register Endpoint
 * Tests the authRateLimit functionality (5 requests per minute per IP)
 */

import { POST } from "@/app/api/auth/register/route";
import { authRateLimit } from "@/lib/rateLimit";
import { NextRequest } from "next/server";

// Mock dependencies
jest.mock("@/lib/db");
jest.mock("@/lib/email", () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));
jest.mock("@/lib/rateLimit");
jest.mock("@/models/userModel");
jest.mock("@/models/patientProfile");
jest.mock("@/models/doctorProfile");
jest.mock("@/utils/auth", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashedPassword123"),
}));

// Mock next/headers
jest.mock("next/headers", () => ({
  headers: jest.fn(() => ({
    get: jest.fn((header) => {
      if (header === "x-forwarded-for") return "192.168.1.1";
      if (header === "x-real-ip") return null;
      return null;
    }),
  })),
}));

describe("Register Endpoint - Rate Limiting", () => {
  const validPayload = {
    email: "test@example.com",
    password: "SecurePass123!",
    role: "patient",
    firstName: "John",
    lastName: "Doe",
    gender: "male",
    dateOfBirth: "1990-01-01",
    phone: "1234567890",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rate Limit - 5 requests per minute", () => {
    it("should allow first 5 requests from same IP", async () => {
      // Mock successful rate limit checks
      authRateLimit.limit = jest
        .fn()
        .mockResolvedValue({ success: true, limit: 5, remaining: 4 });

      // First 5 requests should succeed
      for (let i = 0; i < 5; i++) {
        authRateLimit.limit.mockResolvedValueOnce({
          success: true,
          limit: 5,
          remaining: 4 - i,
        });

        const request = new Request("http://localhost:3000/api/auth/register", {
          method: "POST",
          body: JSON.stringify(validPayload),
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "192.168.1.1",
          },
        });

        const response = await POST(request);

        // Should not be 429 (rate limited) for first 5 requests
        expect(response.status).not.toBe(429);
      }

      // Verify rate limit was called 5 times
      expect(authRateLimit.limit).toHaveBeenCalledTimes(5);
    });

    it("should block 6th request from same IP within 1 minute", async () => {
      const request = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.1",
        },
      });

      // Mock rate limit failure on 6th request
      authRateLimit.limit = jest.fn().mockResolvedValueOnce({
        success: false,
        limit: 5,
        remaining: 0,
        resetAfter: 60,
      });

      const response = await POST(request);

      // Should return 429 Too Many Requests
      expect(response.status).toBe(429);

      const data = await response.json();
      expect(data.message).toEqual(
        "Too many requests. Please try again later."
      );
    });

    it("should extract IP from x-forwarded-for header", async () => {
      authRateLimit.limit = jest.fn().mockResolvedValueOnce({
        success: true,
        limit: 5,
        remaining: 4,
      });

      const request = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "203.0.113.45",
        },
      });

      await POST(request);

      // Verify x-forwarded-for IP was used for rate limiting
      expect(authRateLimit.limit).toHaveBeenCalledWith("203.0.113.45");
    });

    it("should fallback to x-real-ip header if x-forwarded-for is missing", async () => {
      authRateLimit.limit = jest.fn().mockResolvedValueOnce({
        success: true,
        limit: 5,
        remaining: 4,
      });

      const request = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-real-ip": "198.51.100.89",
        },
      });

      // Mock headers to return only x-real-ip
      const { headers } = require("next/headers");
      headers.mockReturnValueOnce({
        get: jest.fn((header) => {
          if (header === "x-real-ip") return "198.51.100.89";
          return null;
        }),
      });

      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("198.51.100.89");
    });

    it("should use 'Unknown' as IP if both headers are missing", async () => {
      authRateLimit.limit = jest.fn().mockResolvedValueOnce({
        success: true,
        limit: 5,
        remaining: 4,
      });

      const request = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Mock headers to return no IP headers
      const { headers } = require("next/headers");
      headers.mockReturnValueOnce({
        get: jest.fn(() => null),
      });

      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("Unknown");
    });
  });

  describe("Rate Limit - Error Response Format", () => {
    it("should return correct 429 status code and message", async () => {
      authRateLimit.limit = jest.fn().mockResolvedValueOnce({
        success: false,
        limit: 5,
        remaining: 0,
        resetAfter: 60,
      });

      const request = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.1",
        },
      });

      const response = await POST(request);

      expect(response.status).toBe(429);
      expect(response.headers.get("content-type")).toContain(
        "application/json"
      );

      const data = await response.json();
      expect(data).toHaveProperty("message");
      expect(data.message).toBe("Too many requests. Please try again later.");
    });
  });

  describe("Rate Limit - Different IPs", () => {
    it("should allow same endpoint request limit per unique IP", async () => {
      authRateLimit.limit = jest
        .fn()
        .mockResolvedValue({ success: true, limit: 5, remaining: 4 });

      const request1 = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.1",
        },
      });

      const request2 = new Request("http://localhost:3000/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": "192.168.1.2",
        },
      });

      await POST(request1);
      await POST(request2);

      // Both IPs should be tracked separately
      expect(authRateLimit.limit).toHaveBeenCalledWith("192.168.1.1");
      expect(authRateLimit.limit).toHaveBeenCalledWith("192.168.1.2");
    });
  });
});
