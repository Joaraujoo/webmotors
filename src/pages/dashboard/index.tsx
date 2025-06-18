import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/panelHeader";

export function Dashboard(){
  return(
    <Container>
      <DashboardHeader/>
        <div className="w-full flex">
          <h1 className="m-auto text-zinc-600">Nenhum carro cadastrado!</h1>
        </div>
    </Container>
  )
}