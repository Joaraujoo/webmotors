import { onAuthStateChanged } from "firebase/auth";
import { type ReactNode, createContext, useState, useEffect  } from "react";
import { auth } from "../services/firebaseConnection";

//Tipagem do provider
interface AuthProviderProps {
    children: ReactNode;
}

//Tipagem da exportação do contexto
type AuthContextDada = {
    signed: boolean;
    loadingAuth: boolean;
    handleInfoUser: ({name, email, uid}: UserProps) => void; //atualiza os dados do usuario
    user: UserProps | null;
}

//Tipagem do Usuario
interface UserProps{
    uid: string;
    name: string | null;
    email: string | null;
}

//Contexto
export const AuthContext = createContext({} as AuthContextDada)

//Provider do contexto
function AuthProvider({ children }: AuthProviderProps){

    const [user, setUser] = useState<UserProps | null>(null)
    const [loadingAuth, setLoadingAuth] = useState(true)

    //Ao carregar o componente, verifica lá no firebase se tem usuario logado
    useEffect(() => {

        const unsub = onAuthStateChanged(auth, (user) => {
            //Passa as informaçao caso tenha usuario logado
            if(user){
                setUser({
                    uid: user.uid,
                    name: user?.displayName,
                    email: user?.email
                })

                setLoadingAuth(false)
            }else{
                setUser(null)
                setLoadingAuth(false)
            }
        })

        //Remove o olheiro caso desmonte ele
        return () => {
            unsub() 
        }

    }, [])

    function handleInfoUser({name, uid, email}: UserProps){
        setUser({
            name,
            email,
            uid,
        })
    }

    return(
        <AuthContext.Provider value={{signed: !!user, loadingAuth, handleInfoUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;