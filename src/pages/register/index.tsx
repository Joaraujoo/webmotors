import { Container } from "../../components/container";
import logo from "../../assets/logo.svg"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect } from "react";

//Definindo o schema de validação com Zod
const schama = z.object({
  email: z.string().email("Insira um email valido").nonempty("O campo email é obrigatório!"),
  password: z.string().min(6, "A senha deve ser maior que 6 caracteres").nonempty("O campo senha é obrigatório!"),
  name: z.string().nonempty("Insira um nome!")
})

//Define o tipo automaticamente com base nas regras do schama
type FormData = z.infer<typeof schama>

export function Register(){

  const navigate = useNavigate()
  

  //Gerencia o formulario
  const { register, handleSubmit, formState: {errors} } = useForm<FormData>({
    resolver: zodResolver(schama),
    mode: "onChange"
  })

  //Desloga o usuario caso estaja logado ao abrir o componente
    useEffect(() => {
      async function handleLogout(){
        await signOut(auth)
      }
  
      handleLogout()
    }, [])

  //Cadastrar o usuario utilizando o firebase
  async function onSubmit(data: FormData){
    createUserWithEmailAndPassword(auth, data.email, data.password)
    .then(async (user) => {
      await updateProfile(user.user, {
        displayName: data.name
      })

      console.log("CADASTRATO COM SUCESSO!")
      navigate("/dashboard", {replace: true})
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return(
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6 max-w-sm w-full">
          <img
            className="w-full" 
            src={logo} 
            alt="Logo do webCarros" />
        </Link>

        <form className="bg-white max-w-xl w-full rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <Input
              type="text"
              placeholder="Digite seu nome completo.."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email.."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha.."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button type="submit" className="w-full rounded-md h-10 text-white font-medium cursor-pointer bg-[#000] hover:bg-[#202020]">Cadastrar</button>
            

        </form>

        <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
      </div>

    </Container>
  )
}