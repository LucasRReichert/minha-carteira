import React, { createContext, useState, useContext } from 'react'

interface AuthContextInterface {
    logged: boolean,
    signIn(email: string, password: string): void,
    signOut(): void,
}

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

const AuthProvider: React.FC = ({ children }) => {
    const [logged, setLogged] = useState<boolean>(() => {
        const isLogged = localStorage.getItem('@minha-carteira:logged')

        return !!isLogged
    })

    const signIn = (email: string, password: string) => {
        if(email === 'elfaisao@hotmail.com' && password === '123'){
            localStorage.setItem('@minha-carteira:logged', 'true')
            setLogged(true)
        }else{
            alert('Senha ou usuário inválidos')
        }
    }

    const signOut = () => {
        localStorage.removeItem('@minha-carteira:logged')
        setLogged(false)
    }

    return (
        <AuthContext.Provider value={{logged, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth():AuthContextInterface {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }