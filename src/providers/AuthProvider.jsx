import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

const AuthProvider = ({ children }) => {

    const { fetchCurrentUser, initialFetch } = useAuthStore();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            {initialFetch ? children : null}
        </>
    )
}

export default AuthProvider