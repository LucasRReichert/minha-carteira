import React, { createContext, useState, useContext } from 'react'

import dark from '../styles/themes/dark'
import light from '../styles/themes/light'

interface ThemeContextInterface {
    toggleTheme(): void,
    theme: ThemeInterface,
} 

interface ThemeInterface {
        title: string,
        colors: {
            primary: string,
            secondary: string,
            tertiary: string,
    
            white: string,
            black: string,
            gray: string,
    
            success: string,
            info: string,
            warning: string,
        },
}

const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface)

const ThemeProvider: React.FC = ({ children }) => {
    const [theme,setTheme] = useState<ThemeInterface>(() => {
        const savedTheme = localStorage.getItem('@minha-carteira:theme')
        if (savedTheme) {
            return JSON.parse(savedTheme)
        }else{
            return dark
        }
    })

    const toggleTheme = () => {
        if(theme.title === 'dark') {
            setTheme(light)
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(light))
        }else{
            setTheme(dark)
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark))
        }
    }
    
    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
        {children}
    </ThemeContext.Provider>
)
}

function useTheme(): ThemeContextInterface {
    const context = useContext(ThemeContext)

    return context
}

export { ThemeProvider, useTheme } 