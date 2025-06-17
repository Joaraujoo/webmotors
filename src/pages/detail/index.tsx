import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../../components/container";
import { api } from "../../services/api";
import type { MotorsProps } from "../home";
import { FaWhatsapp } from "react-icons/fa";

export function Detail() {
  const { id } = useParams();
  const [motor, setMotor] = useState<MotorsProps | null>(null);

  useEffect(() => {
    async function getMotor() {
      try {
        const response = await api.get(`/motors/${id}`); // <- aqui convertendo para número
        setMotor(response.data);
      } catch (error) {
        console.error("Erro ao buscar motor:", error);
      }
    }

    getMotor();
  }, [id]);

  if (!motor) {
    return <p>Carregando ou item não encontrado...</p>;
  }

  return (
    <Container>
      <section className="w-full max-w-4xl m-auto px-3">

        <main className="bg-white p-3 rounded-lg">

        <img src={motor.cover} alt="" className="m-auto mb-5 rounded-lg w-full max-h-72 object-cover"/>

          <div className="flex justify-between mb-5">
            <h1 className="font-bold">{motor.title}</h1>
            <h1 className="font-bold">{motor.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}</h1>
          
          </div>

          <div>

            <div className="flex gap-35">
              <p>Cidade</p>
              <p>ANO/KM</p>
            </div>
            <div className="flex gap-15">
              <p className="font-bold">{motor.location}</p>
              <p className="font-bold">{motor.year_km}</p>
          </div>

            <div className="mt-5">
              <p className="font-bold">Descrição</p>
              <p>{motor.description}</p>
            </div>

            <div className="mt-5 mb-5">
              <p className="font-bold">Telefone</p>
              <p>{motor.phone}</p>
            </div>

            <a 
            href={`https://api.whatsapp.com/send?phone=${motor.phone}&text=Olá, tenho interesse no ${motor.title}, podemos falar mais sobre?`}
            className="bg-green-400 text-white w-full p-2 rounded-lg font-bold cursor-pointer flex gap-3 items-center justify-center"
            target="blank"
            >
              Conversar com o vendedor <FaWhatsapp/>
            </a>

          </div>
        </main>
        
      </section>
    </Container>
  );
}
