import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({ message: "Por favor introduzca un email válido" }).trim(),
    password: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
});

export const RegisterSchema = z.object({
    email: z.string().email({ message: "Por favor introduzca un email válido" }).trim(),
    password: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
    password2: z.string().min(5, { message: "Debe tener al menos 5 caracteres" }).trim(),
});

export type FormState = 
    | {
        errors?: {
            email?: string[];
            password?: string[];
        }
        message?: string;
    }
    | undefined;
