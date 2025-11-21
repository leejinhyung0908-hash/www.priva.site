import { StateCreator } from 'zustand';
import { soccerApi } from '@/lib/api';
import { UISlice } from './uiSlice';

export interface PlayerSlice {
    players: {
        data: any[];
        selectedPlayer: any | null;
        searchKeyword: string;
    };
    setPlayers: (players: any[]) => void;
    setSelectedPlayer: (player: any | null) => void;
    setSearchKeyword: (keyword: string) => void;
    fetchPlayers: (keyword?: string) => Promise<void>;
}

export const createPlayerSlice: StateCreator<
    PlayerSlice & UISlice,
    [],
    [],
    PlayerSlice
> = (set, get) => ({
    players: {
        data: [],
        selectedPlayer: null,
        searchKeyword: '',
    },
    setPlayers: (players) =>
        set((state) => ({
            players: { ...state.players, data: players },
        })),
    setSelectedPlayer: (player) =>
        set((state) => ({
            players: { ...state.players, selectedPlayer: player },
        })),
    setSearchKeyword: (keyword) =>
        set((state) => ({
            players: { ...state.players, searchKeyword: keyword },
        })),
    fetchPlayers: async (keyword?: string) => {
        set((state) => ({
            ui: { ...state.ui, isLoading: true, error: null },
            players: { ...state.players, searchKeyword: keyword || '' },
        }));

        try {
            const response = await soccerApi.getPlayers(keyword);
            const players = response.data?.message || [];

            set((state) => ({
                players: { ...state.players, data: players },
                ui: { ...state.ui, isLoading: false },
            }));
        } catch (error: any) {
            const errorMessage = error?.response
                ? `상태 코드: ${error.response.status}, 메시지: ${error.response.statusText}`
                : error?.message || '알 수 없는 오류';

            set((state) => ({
                ui: { ...state.ui, isLoading: false, error: errorMessage },
            }));
        }
    },
});

