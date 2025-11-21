import { StateCreator } from 'zustand';
import { soccerApi } from '@/lib/api';
import { UISlice } from './uiSlice';

export interface TeamSlice {
    teams: {
        data: any[];
        selectedTeam: any | null;
    };
    setTeams: (teams: any[]) => void;
    setSelectedTeam: (team: any | null) => void;
    fetchTeams: () => Promise<void>;
}

export const createTeamSlice: StateCreator<
    TeamSlice & UISlice,
    [],
    [],
    TeamSlice
> = (set) => ({
    teams: {
        data: [],
        selectedTeam: null,
    },
    setTeams: (teams) =>
        set((state) => ({
            teams: { ...state.teams, data: teams },
        })),
    setSelectedTeam: (team) =>
        set((state) => ({
            teams: { ...state.teams, selectedTeam: team },
        })),
    fetchTeams: async () => {
        set((state) => ({
            ui: { ...state.ui, isLoading: true, error: null },
        }));

        try {
            const response = await soccerApi.getTeams();
            const teams = response.data || [];

            set((state) => ({
                teams: { ...state.teams, data: teams },
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

