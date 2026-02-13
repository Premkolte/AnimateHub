import { create } from "zustand"
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    isAuthLoading: true,
    authError: null,
    currentUser: null,
    initialFetch: false,
    successfullyResetPassword: null,

    setIsAuthLoading: (isLoading) => set({ isAuthLoading: isLoading }),
    setError: (error) => set({ authError: error }),
    setCurrentUser: (user) => set({ currentUser: user }),


    /**
     * Sign up a new user
     * @param {Object} userData - data for the new user
     * @param {string} userData.username - username
     * @param {string} userData.fullName - full name
     * @param {string} userData.email - email
     * @param {string} userData.password - password
     */
    handleGoogleSignin:async (googleCredential) => {
        set({isAuthLoading:true});
        try{
            const apiResponse=await axiosInstance.post('/auth/google-login',{
                credential:googleCredential
            });
            const response=apiResponse.data;
            if(response.success){
                set({currentUser:response.data.user});
                toast.success("Google Sign-In successful!");
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
        } finally {
            set({ isAuthLoading: false })
        }
    },


    handleSignUp: async (userData) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/register', userData);
            const response = apiResponse.data;
            if (response.success) {
                set({ currentUser: response.data.user });
                return true;
            } else {
                set({ authError: response.message });
                return false;
            }
        } catch (error) {
            set({ authError: error.response.data.message });
            return false;
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Login a user
     * @param {Object} userData - data for the user
     * @param {string} userData.username - username
     * @param {string} userData.password - password
     */
    handleLogin: async (userData) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/login', userData);
            const response = apiResponse.data;
            if (response.success) {
                set({ currentUser: response.data.user });
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Fetch the current user
     */
    fetchCurrentUser: async (silent = true) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.get('/auth/check');
            console.log(apiResponse)
            const response = apiResponse.data;
            if (response.success) {
                set({ currentUser: response.data.user });
                set({ authError: null })
            } else {
                if (!silent) toast.error(response.message)
            }
        } catch (error) {
            if (!silent) toast.error(error.response.data.message)
        } finally {
            set({ isAuthLoading: false })
            set({ initialFetch: true })
        }
    },


    /**
     * Logout the current user
     */
    logout: async () => {
        set({ isAuthLoading: true });
        try {
            await axiosInstance.post('/auth/logout');
            set({ currentUser: null });
            toast.success("User logged out successfully");
        } catch (error) {
            set({ authError: error.response.data.message });
            toast.error("Failed to logout user!")
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Verify the email of the current user
     * @param {string} token - token for verification
     */
    verifyEmail: async (token) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.get(`/auth/verify-email/${token}`);
            const response = apiResponse.data;
            if (response.success) {
                set({ currentUser: response.data.user });
                set({ authError: null })
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Resend the verification email to the current user
     */
    resendVerificationEmail: async () => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/resend-verification');
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null })
                toast.success(response.message)
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
            toast.error(error.response.data.message)
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Update the password of the current user
     * @param {Object} data - data for the password update
     * @param {string} data.currentPassword - current password
     * @param {string} data.newPassword - new password
     */
    updatePassword: async ({ currentPassword, newPassword }) => {
        set({ isAuthLoading: true })
        try {
            const apiResponse = await axiosInstance.post('/auth/update-password', { currentPassword, newPassword });
            const response = apiResponse.data;
            if (response.success) {
                set({ currentUser: response.data.user });
                toast.success(response.message)
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
        } finally {
            set({ isAuthLoading: false })
        }
    },


    /**
     * Forgot password
     * @param {Object} data - data for the forgot password
     * @param {string} data.email - email
     */
    forgotPassword: async (email) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/forgot-password', { email });
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null })
                toast.success(response.message)
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Reset password
     * @param {Object} data - data for the reset password
     * @param {string} data.newPassword - new password
     * @param {string} data.token - token
     */
    resetPassword: async (newPassword, token) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post(`/auth/reset-password/${token}`, { newPassword });
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null })
                set({ successfullyResetPassword: true })
                toast.success(response.message)
            } else {
                set({ authError: response.message });
            }
        } catch (error) {
            set({ authError: error.response.data.message });
            set({ successfullyResetPassword: false })
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Generate OTP for email verification
     * @param {string} email - User's email address
     */
    generateOTP: async (email) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/generate-otp', { email });
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null })
                return true;
            } else {
                set({ authError: response.message });
                return false;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to generate OTP';
            set({ authError: errorMsg });
            return false;
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Verify OTP code
     * @param {string} email - User's email address
     * @param {string} otp - 6-digit OTP code
     */
    verifyOTP: async (email, otp) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/verify-otp', { email, otp });
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null });
                return true;
            } else {
                set({ authError: response.message });
                return false;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Invalid or expired OTP';
            set({ authError: errorMsg });
            return false;
        } finally {
            set({ isAuthLoading: false })
        }
    },

    /**
     * Resend OTP to user's email
     * @param {string} email - User's email address
     */
    resendOTP: async (email) => {
        set({ isAuthLoading: true });
        try {
            const apiResponse = await axiosInstance.post('/auth/generate-otp', { email });
            const response = apiResponse.data;
            if (response.success) {
                set({ authError: null });
                return true;
            } else {
                set({ authError: response.message });
                return false;
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to resend OTP';
            set({ authError: errorMsg });
            return false;
        } finally {
            set({ isAuthLoading: false })
        }
    }


}))