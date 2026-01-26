import { z } from 'zod';

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, 'auth.validation.usernameMin')
    .max(10, 'auth.validation.usernameMax')
    .regex(/^[a-z0-9_]+$/, 'auth.validation.usernameFormat'),
  password: z.string().min(8, 'auth.validation.passwordMin').max(255, 'auth.validation.passwordMax'),
});

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'auth.validation.usernameMin')
    .max(10, 'auth.validation.usernameMax')
    .regex(/^[a-z0-9_]+$/, 'auth.validation.usernameFormat'),
  password: z.string().min(8, 'auth.validation.passwordMin').max(255, 'auth.validation.passwordMax'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
