import logo from "../../assets/logo.svg"
import { Link } from "react-router-dom"
import { FiUser, FiLogIn   } from "react-icons/fi";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Header(){

    const {signed, loadingAuth} = useContext(AuthContext)

    return(
        <header className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
            <nav className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">

                <Link to="/">
                     <img src={logo} alt="Logo webCarros" className="w-30"/>
                </Link>

                {!loadingAuth && signed && (
                    <Link to="/dashboard">
                        <div className="border-2 rounded-full p-1 border-gray-900">
                            <FiUser size={22} color="#000"></FiUser>
                        </div>
                    </Link>
                )}

                 {!loadingAuth && !signed && (
                    <Link to="/login">
                        <FiLogIn size={22} color="#000"></FiLogIn>
                    </Link>
                )}
               

            </nav>
        </header>
    )
}