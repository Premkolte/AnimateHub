import { HelmetProvider } from "react-helmet-async"
import { ThemeProvider } from 'next-themes';
import { FavoritesProvider } from "../contexts/FavoritesContext";
import AuthProvider from "./AuthProvider";



const AppProvider = ({ children }) => {


    return (
        <>
            <HelmetProvider>
                <ThemeProvider attribute="class">
                    <AuthProvider>
                        <FavoritesProvider>

                            {children}

                        </FavoritesProvider>
                    </AuthProvider>
                </ThemeProvider>
            </HelmetProvider>
        </>
    )
}

export default AppProvider