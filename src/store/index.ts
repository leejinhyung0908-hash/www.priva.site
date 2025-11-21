import { create } from 'zustand';
import { createUISlice, UISlice } from './slices/uiSlice';
import { createPlayerSlice, PlayerSlice } from './slices/playerSlice';
import { createTeamSlice, TeamSlice } from './slices/teamSlice';
import { createMessageSlice, MessageSlice } from './slices/messageSlice';

// 전체 Store 타입
export type AppStore = UISlice & PlayerSlice & TeamSlice & MessageSlice;

// Store 생성
export const useAppStore = create<AppStore>()((...a) => ({
    ...createUISlice(...a),
    ...createPlayerSlice(...a),
    ...createTeamSlice(...a),
    ...createMessageSlice(...a),
}));

// 편의 훅들
export const useUI = () => {
    return {
        isLoading: useAppStore((state) => state.ui.isLoading),
        error: useAppStore((state) => state.ui.error),
        theme: useAppStore((state) => state.ui.theme),
        setLoading: useAppStore((state) => state.setLoading),
        setError: useAppStore((state) => state.setError),
        setTheme: useAppStore((state) => state.setTheme),
    };
};

export const usePlayers = () => {
    return {
        players: useAppStore((state) => state.players.data),
        selectedPlayer: useAppStore((state) => state.players.selectedPlayer),
        searchKeyword: useAppStore((state) => state.players.searchKeyword),
        setPlayers: useAppStore((state) => state.setPlayers),
        setSelectedPlayer: useAppStore((state) => state.setSelectedPlayer),
        setSearchKeyword: useAppStore((state) => state.setSearchKeyword),
        fetchPlayers: useAppStore((state) => state.fetchPlayers),
    };
};

export const useTeams = () => {
    return {
        teams: useAppStore((state) => state.teams.data),
        selectedTeam: useAppStore((state) => state.teams.selectedTeam),
        setTeams: useAppStore((state) => state.setTeams),
        setSelectedTeam: useAppStore((state) => state.setSelectedTeam),
        fetchTeams: useAppStore((state) => state.fetchTeams),
    };
};

export const useMessages = () => {
    return {
        messages: useAppStore((state) => state.messages.data),
        isLoading: useAppStore((state) => state.messages.isLoading),
        addMessage: useAppStore((state) => state.addMessage),
        setMessages: useAppStore((state) => state.setMessages),
        clearMessages: useAppStore((state) => state.clearMessages),
        sendMessage: useAppStore((state) => state.sendMessage),
    };
};

// 타입 export
export type { Message } from './types';
