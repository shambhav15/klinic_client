import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from '@/lib/axios';

interface User {
  // Define your User interface here
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    fetchUser: () => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            error: null,

            fetchUser: async () => {
                set({ isLoading: true });
                try {
                    const response = await axios.get('/profile');
                    set({ user: response.data.user });
                    console.log('User data:', response.data.user);
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    set({ user: null });
                } finally {
                    set({ isLoading: false });
                }
            },

            logout: async () => {
                try {
                    await axios.post('/logout');
                    set({ user: null });
                } catch (error) {
                    console.error('Failed to logout:', error);
                }
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
        }
    )
);

export default useUserStore;