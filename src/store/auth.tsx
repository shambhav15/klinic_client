import { create } from "zustand";
import jwt from "jsonwebtoken";
import axios from "axios";

interface User {
    id: string;
    name?: string;
    phone?: string;
    isAdmin?: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logoutUser: () => Promise<void>;
    fetchUser: () => void;
}

const getStoredToken = () => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem("_klinic");
    }
    return null;
}

const decodeToken = (token: string): User | null => {
    try {
        const decodedToken = jwt.decode(token) as jwt.JwtPayload;
        if (decodedToken) {
            return {
                id: decodedToken.id as string,
                name: decodedToken.name,
                phone: decodedToken.phone,
                isAdmin: decodedToken.isAdmin,
            };
        }
    } catch (error) {
        console.error("Error decoding token", error);
    }
    return null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: getStoredToken(),

    setToken: (token: string) => {
        set({ token });
        window.localStorage.setItem("_klinic", token);
        const user = decodeToken(token);
        if (user) {
            set({ user });
        }
    },

    setUser: (user: User) => {
        set({ user });
    },

    fetchUser: () => {
        const { token } = get();
        if (!token) return;

        const user = decodeToken(token);
        if (user) {
            set({ user });
        }
    },

    logoutUser: async () => {
        const { token } = get();
        console.log("Logging out user", token);

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                console.log("User logged out successfully");
                set({ token: null, user: null });
                window.localStorage.removeItem("_klinic");
            }
        } catch (error) {
            console.error("Error logging out user", error);
        }
    },
}));

// Initialize user on store creation
if (typeof window !== "undefined") {
    const token = getStoredToken();
    if (token) {
        const user = decodeToken(token);
        if (user) {
            useAuthStore.getState().setUser(user);
        }
    }
}