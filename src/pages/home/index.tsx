import { Link } from "react-router-dom";
import { Container } from "../../components/container";
import { api } from "../../services/api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";


interface MotorsProps{
    id: string,
    title: string,
    year_km: string,
    price: number, 
    location: string,
    description: string,
    cover: string
}

export function Home(){

  const [motors, setMotors] = useState<MotorsProps[]>([])
  const [search, setSearch] = useState("");
  const [filteredMotors, setFilteredMotors] = useState<MotorsProps[]>([]);


  useEffect(() => { 
    async function getMotors(){
      const response = await api.get("/motors")
      setMotors(response.data)
      setFilteredMotors(response.data)
    }

    getMotors()
  }, [])

  useEffect(() => {
  if (search.trim() === "") {
    setFilteredMotors(motors);
  }
}, [search, motors]);


 function handleSearch(){

  if (search.trim() === "") {
    toast.error("Digite algo para buscar");
    return;
  }

  const results = motors.filter((motor) => {
    return motor.title.toLowerCase().includes(search.toLowerCase())

  })

  
  setFilteredMotors(results)
 }

  return(
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2 ">
       
          <input 
            className="w-full border-1 rounded-lg h-9 px-3 outline-none"
            type="text" 
            placeholder="Digite o nome do carro..."  
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          
          <button className="h-9 bg-red-500 px-8 rounded-lg text-white font-medium cursor-pointer" onClick={handleSearch}>Buscar</button>
        
      </section>

      <h1 className="font-bold text-center mt-6 text-1xl mb-4">Carros novos e usados em todo o Brasil</h1>

      
        {filteredMotors.length === 0 && (
          <p className="text-center text-zinc-600 mt-6">Nenhum carro encontrado.</p>
        )}

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">

       {filteredMotors.map((item) => (
        <Link to={`/car/${item.title}`}>
        <section className="w-full max-w-90 bg-white rounded-lg hover:scale-105 transition-all mx-auto mb-5">
            <img 
              className="w-full max-h-72 rounded-t-lg mb-2 object-cover"
              src={item.cover} alt={item.title} 
            />

            <p className="font-bold mt-1 mb-2 px-2">{item.title}</p>
            <div className="flex flex-col px-2">
              <p className="text-zinc-700 mb-6">{item.year_km}</p>
              <strong className="text-black font-medium text-xl">{item.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
                })}
              </strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <p className="px-2 pb-2  text-zinc-700">{item.location}</p>
        </section>
        </Link>
       ))}

         
      </main>
    </Container>
  )
}