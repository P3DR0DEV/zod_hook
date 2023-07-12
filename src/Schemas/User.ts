import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O campo nome é obrigatório")
    .transform((name) =>
      name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ")
    ),
  email: z
    .string()
    .nonempty("O campo email é obrigatório")
    .email("Formato de email invalido.")
    .toLowerCase()
    .refine((email) => {
      return email.endsWith("@claretiano.edu.br");
    }, "O email deve ser institucional."),
  password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O titulo é obrigatório."),
        knowledge: z.coerce.number().min(1).max(10),
      })
    )
    .min(2, "Insira pelo menos 2 tecnologias"),
});

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;
