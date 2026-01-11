import z from "zod";
import { UserRole } from "./user.interface";

// USER CREATE VALIDATION
const userCreateValidation = z.object({
    name: z.string().min(3, 'Full name must be at least 3 characters long'),
    email: z.email({ error: 'Invalid email address' }),
    password: z
        .string({ error: "password must be string." })
        .min(8, { message: "Password minimum 8 characters long." })
        .regex(/^(?=.*[A-Z])/, { message: "Password must be contain at least 1 uppercase letter" })
        .regex(/^(?=.*[a-z])/, { message: "Password must be contain at least 1 lowercase letter" })
        .regex(/^(?=.*[!@#$%^&*])/, { message: "Password must be contain at least 1 special character." })
        .regex(/^(?=.*\d)/, { message: "Password must be contain at least 1 number" }),
});

// USER UPDATE VALIDATION
const userUpdateValidation = z.object({
    name: z.string().min(3, 'Full name must be at least 3 characters long'),
});

//User Role Update Validation
const userRoleUpdateValidation = z.object({
    email: z.email({ error: "User email must be a string & valid email address" }),
    role: z.enum([UserRole.ADMIN, UserRole.USER], { error: "Invalid user role! Value must be from ADMIN, USER the given options." }),
});

export const UserValidation = {
    userCreateValidation,
    userUpdateValidation,
    userRoleUpdateValidation,
};