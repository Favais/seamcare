/**
 * Rate Limit Tests for Register Endpoint
 * Tests the authRateLimit functionality (5 requests per minute per IP)
 */

import { POST } from "@/app/api/auth/register/route";
import { authRateLimit } from "@/lib/rateLimit";

// --------------------
// Mock dependencies
// --------------------
jest.mock("@/lib/db");
jest.mock("@/lib/email", () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/lib/rateLimit", () => ({
  authRateLimit: {
    limit: jest.fn(),
  },
}));

jest.mock("@/models/userModel");
jest.mock("@/models/patientProfile");
jest.mock("@/models/doctorProfile");

jest.mock("@/utils/auth", () => ({
  hashPassword: jest.fn().mockResolvedValue("hashedPassword123"),
}));

jest.mock("@/schemas/registerSchema", () => ({
  registerSchema: {
    parse: jest.fn((data) => data),
  },
}));

// IMPORTANT: App Router headers must be mocked explicitly
jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));

const { headers } = require("next/headers");

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
      headers.mockReturnValue({
        get: () => "192.168.1.1",
      });

      authRateLimit.limit.mockResolvedValue({ success: true });

      for (let i = 0; i < 5; i++) {
        const request = new Request("http://localhost/api/auth/register", {
          method: "POST",
          body: JSON.stringify(validPayload),
        });

        const response = await POST(request);
        expect(response.status).not.toBe(429);
      }

      expect(authRateLimit.limit).toHaveBeenCalledTimes(5);
    });

    it("should block 6th request from same IP within 1 minute", async () => {
      headers.mockReturnValue({
        get: () => "192.168.1.1",
      });

      authRateLimit.limit.mockResolvedValueOnce({ success: false });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      const response = await POST(request);

      expect(response.status).toBe(429);

      const data = await response.json();
      expect(data.message).toBe("Too many requests. Please try again later.");
    });

    it("should extract IP from x-forwarded-for header", async () => {
      headers.mockReturnValue({
        get: (key) => (key === "x-forwarded-for" ? "203.0.113.45" : null),
      });

      authRateLimit.limit.mockResolvedValue({ success: true });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("203.0.113.45");
    });

    it("should fallback to x-real-ip header if x-forwarded-for is missing", async () => {
      headers.mockReturnValue({
        get: (key) => (key === "x-real-ip" ? "198.51.100.89" : null),
      });

      authRateLimit.limit.mockResolvedValue({ success: true });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("198.51.100.89");
    });

    it("should use 'Unknown' as IP if both headers are missing", async () => {
      headers.mockReturnValue({
        get: () => null,
      });

      authRateLimit.limit.mockResolvedValue({ success: true });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("Unknown");
    });
  });

  describe("Rate Limit - Error Response Format", () => {
    it("should return correct 429 status code and message", async () => {
      headers.mockReturnValue({
        get: () => "192.168.1.1",
      });

      authRateLimit.limit.mockResolvedValue({ success: false });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      const response = await POST(request);

      expect(response.status).toBe(429);
      expect(response.headers.get("content-type")).toContain(
        "application/json"
      );

      const data = await response.json();
      expect(data.message).toBe("Too many requests. Please try again later.");
    });
  });

  describe("Rate Limit - Different IPs", () => {
    it("should allow same endpoint request limit per unique IP", async () => {
      authRateLimit.limit.mockResolvedValue({ success: true });

      headers
        .mockReturnValueOnce({
          get: () => "192.168.1.1",
        })
        .mockReturnValueOnce({
          get: () => "192.168.1.2",
        });

      const request = new Request("http://localhost/api/auth/register", {
        method: "POST",
        body: JSON.stringify(validPayload),
      });

      await POST(request);
      await POST(request);

      expect(authRateLimit.limit).toHaveBeenCalledWith("192.168.1.1");
      expect(authRateLimit.limit).toHaveBeenCalledWith("192.168.1.2");
    });
  });
});
