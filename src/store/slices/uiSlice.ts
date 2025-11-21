import { StateCreator } from 'zustand';

export interface UISlice {
    ui: {
        isLoading: boolean;
        error: string | null;
        theme: 'light' | 'dark';
    };
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setTheme: (theme: 'light' | 'dark') => void;
}

export const createUISlice: StateCreator<UISlice> = (set) => ({
    ui: {
        isLoading: false,
        error: null,
        theme: 'light',
    },
    setLoading: (loading) =>
        set((state) => ({
            ui: { ...state.ui, isLoading: loading },
        })),
    setError: (error) =>
        set((state) => ({
            ui: { ...state.ui, error },
        })),
    setTheme: (theme) =>
        set((state) => ({
            ui: { ...state.ui, theme },
        })),
});

