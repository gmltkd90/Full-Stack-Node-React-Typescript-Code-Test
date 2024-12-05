// src/validation/loginValidation.ts
import { z } from 'zod';

// Define the validation schema for the login form
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validates the email format
  password: z.string().min(6, "Password must be at least 6 characters"), // Ensures password length
});
