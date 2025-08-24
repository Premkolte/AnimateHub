import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import Loader from "../components/layout/Loader";

const AuthProvider = ({ children }) => {
    const { fetchCurrentUser, initialFetch } = useAuthStore();

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <>
            {initialFetch ? children : <Loader />}
        </>
    );
};

export default AuthProvider;