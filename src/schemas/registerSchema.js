import { z } from "zod";

const userSchema = {
    firstName: z
        .string()
        .min(1, "First name is required"),

    lastName: z
        .string()
        .min(1, "Last name is required"),

    email: z
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain uppercase, lowercase and number"
        ),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    dateOfBirth: z
        .string()
        .refine(
            (val) => !isNaN(Date.parse(val)),
            "Invalid date format"
        )
        .refine(
            (val) => {
                const dob = new Date(val);
                const age = new Date().getFullYear() - dob.getFullYear();
                return age >= 18;
            },
            "You must be at least 18 years old"
        ),

    gender: z
        .string()
        .nonempty("Gender is required") // catches empty string
        .refine((val) => ["male", "female", "other"].includes(val), {
            message: "Please select a valid gender: male, female, or other",
        }),

    address: z
        .string()
        .min(5, "Address must be at least 5 characters")
        .max(100, "Address is too long"),

    phone: z
        .string()
        .regex(
            /^\+?[1-9]\d{1,14}$/,
            "Invalid phone number"
        ),
}

const patientSchema = z.object({
    role: z.literal("patient"),
    ...userSchema,

    bloodGroup: z.string(),
    insurance: z.object({}).optional(),
    medicalHistory: z.string().optional(),
    vitals: z.object({}).optional(),
    appointments: z.array(z.any()).optional(),
    labResults: z.array(z.any()).optional(),
    vaccinations: z.array(z.any()).optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const doctorSchema = z.object({
    role: z.literal("doctor"),
    ...userSchema,

    specialization: z.string().min(2),
    experience: z.string().optional(),
    hospital: z.string().optional(),
    weeklySchedule: z.array(z.any()).optional(),
    biography: z.string().optional(),
    profileImg: z.string().optional(),
    rating: z.number().optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export const registerSchema = z.discriminatedUnion("role", [
    patientSchema,
    doctorSchema,
]);