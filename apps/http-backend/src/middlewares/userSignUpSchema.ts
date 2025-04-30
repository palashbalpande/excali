import { z } from "zod";

export const userSignUpSchema = z.object({
  firstName: z.string().min(1, { message: "firstName required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must be atleast characters" })
    .regex(/ [A-Z] /, { message: "atleast one upperCase letter required" })
    .regex(/ [a-z] /, { message: "atleast one lowerCase letter required" })
    .regex(/ [\W_] /, { message: "atleast one special character required" }),
});

export type SignUpBody = z.infer<typeof userSignUpSchema>;
