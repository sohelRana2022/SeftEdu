import { z } from 'zod';
// creating a schema for login form
export const LoginInfoSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'ইমেইলটি সঠিক নয়!' }),
  password: z
    .string()
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        'পাসওয়ার্ডে কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর, একটি সংখ্যা ও একটি স্পেশাল ক্যারেক্টার থাকতে হবে!',
    }),
});
export type LoginInfoType = z.infer<typeof LoginInfoSchema>;
