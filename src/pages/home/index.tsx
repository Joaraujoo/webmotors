import { Container } from "../../components/container";

export function Home(){
  return(
    <Container>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2 ">
       
          <input 
            className="w-full border-1 rounded-lg h-9 px-3 outline-none"
            type="text" 
            placeholder="Digite o nome do carro..."  
          />
          
          <button className="h-9 bg-red-500 px-8 rounded-lg text-white font-medium">Buscar</button>
        
      </section>

      <h1 className="font-bold text-center mt-6 text-1xl mb-4">Carros novos e usados em todo o Brasil</h1>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        <section className="w-full max-w-90 bg-white rounded-lg  hover:scale-105 transition-all mx-auto mb-3">
            <img 
              className="w-full max-h-72 rounded-t-lg mb-2 object-contain"
              src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2025/202504/20250411/porsche-cayenne-3-6-4x4-v6-24v-gasolina-4p-tiptronic-wmimagem14154922524.webp?s=fill&w=552&h=414&q=60" alt="" 
            />

            <p className="font-bold mt-1 mb-2 px-2">Jaguare f-page</p>
            <div className="flex flex-col px-2">
              <p className="text-zinc-700 mb-6">2029/2029 | 2999 km</p>
              <strong className="text-black font-medium text-xl">R$ 239.00</strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <p className="px-2 pb-2 text-zinc-700">Sao Paulo - SP</p>
        </section>
        
      </main>
    </Container>
  )
}