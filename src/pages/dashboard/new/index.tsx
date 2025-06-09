import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelHeader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { error } from "zod/v4/locales/ar.js";

//Definindo o schema de validação com Zod
const schama = z.object({
  name: z.string().nonempty("O campo 'Nome do carro' é obrigatório!"),
  model: z.string().nonempty("O campo 'Modelo' é obrigatório!"),
  year: z.string().nonempty("O campo 'Ano do carro' é obrigatório!"),
  km: z.string().nonempty("O campo 'KM' é obrigatório!"),
  price: z.string().nonempty("O campo 'Valor' é obrigatório!"),
  city: z.string().nonempty("O campo 'Cidade' é obrigatório!"),
  whatsapp: z.string().min(1, "O campo 'Whatsapp' é obrigatorio!").refine((value) => /^(\d{10,11})$/.test(value), {
    message: "Número de telefone inválido!"
  }),
  description: z.string().nonempty("O campo 'Descrição' é obrigatório!")
})

//Define o tipo automaticamente com base nas regras do schama
type FormData = z.infer<typeof schama>


export function New(){

   //Gerencia o formulario
  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
    resolver: zodResolver(schama),
    mode: "onChange"
  })

  function onSubmit(data: FormData){
      console.log(data)
  }

  return(
    <Container>
      <DashboardHeader/>

      <section className="bg-white w-full rounded-lg p-3 flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000"/>
          </div>
          <div className="cursor-pointer">
            <input type="file" accept="image/*" className="opacity-0 cursor-pointer"/>
          </div>
        </button>
      </section>

      <section className="w-full rounded-lg bg-white p-3 flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <p className="mb-2 font-medium">Nome do carro</p>
              <Input 
                type="text"
                register={register}
                name="name"
                error={errors.name?.message}
                placeholder="Ex: Onix"
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Modelo</p>
              <Input 
                type="text"
                register={register}
                name="model"
                error={errors.model?.message}
                placeholder="Ex: 1.0 flex Plus Manual..."
              />
            </div>

            <div className="mb-3 flex gap-4 w-full flex-row items-center">
             <div className="w-full">
               <p className="mb-2 font-medium">Ano</p>
              <Input 
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2014"
              />
             </div>

             <div className="w-full">
               <p className="mb-2 font-medium">KM rodado</p>
              <Input 
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 34555"
              />
             </div>
            </div>

             <div className="mb-3 flex gap-4 w-full flex-row items-center">
             <div className="w-full">
               <p className="mb-2 font-medium">Valor em R$</p>
              <Input 
                type="text"
                register={register}
                name="price"
                error={errors.price?.message}
                placeholder="Ex: R$64.000"
              />
             </div>

             <div className="w-full">
               <p className="mb-2 font-medium">Cidade</p>
              <Input 
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: São Paulo"
              />
             </div>
            </div>

             <div className="mb-3">
              <p className="mb-2 font-medium">Telefone / WhatsApp</p>
              <Input 
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 11936743254"
              />
            </div>

            <div className="mb-3">
              <p className="mb-2 font-medium">Descrição</p>
              <textarea 
                className="border-2 w-full rounded-md h-24 px-2"
                {...register("description")}
                name="description"
                id="description"
                placeholder="Digite a descrição do veiculo"
                />
                {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
            </div>

            <button type="submit" className="w-full h-10 rounded-md bg-zinc-900 text-white font-medium cursor-pointer" >Cadastrar</button>
        </form>
      </section>
    </Container>
  )
}