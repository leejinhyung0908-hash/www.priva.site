// 애플리케이션 전체 상태 타입 정의

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export interface AppState {
    // UI 상태
    ui: {
        isLoading: boolean;
        error: string | null;
        theme: 'light' | 'dark';
    };

    // Player 상태
    players: {
        data: any[];
        selectedPlayer: any | null;
        searchKeyword: string;
    };

    // Team 상태
    teams: {
        data: any[];
        selectedTeam: any | null;
    };

    // Message 상태 (현재 page.tsx에서 사용 중)
    messages: {
        data: Message[];
        isLoading: boolean;
    };
}

// Actions 타입
export interface AppActions {
    // UI Actions
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setTheme: (theme: 'light' | 'dark') => void;

    // Player Actions
    setPlayers: (players: any[]) => void;
    setSelectedPlayer: (player: any | null) => void;
    setSearchKeyword: (keyword: string) => void;
    fetchPlayers: (keyword?: string) => Promise<void>;

    // Team Actions
    setTeams: (teams: any[]) => void;
    setSelectedTeam: (team: any | null) => void;
    fetchTeams: () => Promise<void>;

    // Message Actions
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    clearMessages: () => void;
    sendMessage: (content: string) => Promise<void>;
}

// Store 타입 = State + Actions
export type AppStore = AppState & AppActions;

