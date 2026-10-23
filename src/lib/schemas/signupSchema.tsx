import { z } from 'zod';

// creating a schema for signup form
export const UserInfoSchema = z
  .object({
    uid: z.string().optional(),
    user_name_bang: z
      .string()
      .min(1)
      .regex(/^([\u0980-\u09FF]+)( [\u0980-\u09FF]+)*$/, {
        message: 'বাংলায় লিখুন এবং প্রথমে ও শেষে স্পেস দিবেন না!!',
      }),
    user_name_eng: z
      .string()
      .min(1)
      .regex(/^([A-Z][a-z]*)( [A-Z][a-z]*)*$/, {
        message: 'ইংরেজিতে লিখুন এবং প্রথমে ও শেষে স্পেস দিবেন না!',
      }),
    contact: z.string().regex(/(^(01){1}[3-9]{1}(\d){8})$/, {
      message: 'মোবাইল নাম্বারটি সঠিক নয়!',
    }),
    user_role: z.string().min(1),
    user_title: z.string().min(1),
    related_class: z.string().optional(),
    is_approved: z.boolean(),
    sef_branch: z.string(),
    image_id: z.string(),
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'ইমেইলটি সঠিক নয়!' }),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          'পাসওয়ার্ডে কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর, একটি সংখ্যা ও একটি স্পেশাল ক্যারেক্টার থাকতে হবে!',
      }),
    confirmPassword: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          'পাসওয়ার্ডে কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর, একটি সংখ্যা ও একটি স্পেশাল ক্যারেক্টার থাকতে হবে!',
      }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'পাসওয়ার্ড একই হয়নি!',
    path: ['confirmPassword'], // Field to apply the error message
  });
export type UserInfoType = z.infer<typeof UserInfoSchema>;
