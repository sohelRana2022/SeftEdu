import { z } from 'zod';
// creating a schema for login form
export const LoginInfoSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'ইমেইলটি সঠিক নয়!' }),
  password: z.string().min(1),
});
export type LoginInfoType = z.infer<typeof LoginInfoSchema>;
