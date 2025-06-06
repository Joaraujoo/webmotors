import { Link } from "react-router-dom"
import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"

export function DashboardHeader(){

    async function handleLogout(){
        await signOut(auth)
    }
    return(
        <div className="w-full bg-red-500 px-4 h-8 rounded-lg flex items-center gap-4 text-white font-medium mb-4">
            <Link to="/dashboard">
                Dashboard
            </Link>

            <Link to="/dashboard/new">
                Novo carro
            </Link>

            <button className="ml-auto" onClick={handleLogout}>Sair da conta</button>
        </div>
    )
}