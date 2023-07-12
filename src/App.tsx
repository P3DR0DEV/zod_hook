import { CreateUserFormData, createUserFormSchema } from "./Schemas/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";

export function App() {
  const [output, setOutput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className=" bg-zinc-50 flex flex-col gap-10 items-center justify-center">
      <form
        className="flex flex-col gap-4 w-full max-w-xs"
        onSubmit={handleSubmit(createUser)}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("name")}
          />

          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("email")}
          />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={addNewTech}
              className="text-emerald-500 text-sm"
            >
              Adicionar
            </button>
          </label>
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-2">
                <input
                  type="text"
                  className="border border-zinc-200 shadow-sm rounded h-10 px-3 flex-1"
                  {...register(`techs.${index}.title`)}
                />

                <input
                  type="number"
                  className="border border-zinc-200 shadow-sm rounded h-10 px-3 w-16"
                  {...register(`techs.${index}.knowledge`)}
                />
              </div>
            );
          })}
        </div>

        <button className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600">
          Salvar
        </button>
      </form>
      <pre>{output}</pre>
    </main>
  );
}
