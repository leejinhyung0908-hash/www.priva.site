import axios, { AxiosInstance } from 'axios';
import { API_GATEWAY_URL, SERVICE_PATHS } from '@/config/services';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
    baseURL: API_GATEWAY_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // 필요시 인증 토큰 추가 등
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// Soccer Service API
export const soccerApi = {
    // Search
    search: (keyword: string) =>
        apiClient.get('/api/soccer/search', { params: { keyword } }),

    // Players
    getPlayers: (keyword?: string) =>
        apiClient.get('/api/soccer/players/all', {
            params: keyword ? { keyword } : {}
        }),

    getPlayerById: (id: string) =>
        apiClient.get(`/api/soccer/players/id/${id}`),

    createPlayer: (player: any) =>
        apiClient.post('/api/soccer/players', player),

    updatePlayer: (id: string, player: any) =>
        apiClient.put(`/api/soccer/players/${id}`, player),

    deletePlayer: (id: string) =>
        apiClient.delete(`/api/soccer/players/${id}`),

    // Teams
    getTeams: () =>
        apiClient.get('/api/soccer/teams/all'),

    getTeamById: (id: string) =>
        apiClient.get(`/api/soccer/teams/id/${id}`),

    createTeam: (team: any) =>
        apiClient.post('/api/soccer/teams', team),

    updateTeam: (id: string, team: any) =>
        apiClient.put(`/api/soccer/teams/${id}`, team),

    deleteTeam: (id: string) =>
        apiClient.delete(`/api/soccer/teams/${id}`),

    // Schedules
    getSchedules: () =>
        apiClient.get('/api/soccer/schedules/all'),

    getScheduleById: (id: string) =>
        apiClient.get(`/api/soccer/schedules/id/${id}`),

    createSchedule: (schedule: any) =>
        apiClient.post('/api/soccer/schedules', schedule),

    updateSchedule: (id: string, schedule: any) =>
        apiClient.put(`/api/soccer/schedules/${id}`, schedule),

    deleteSchedule: (id: string) =>
        apiClient.delete(`/api/soccer/schedules/${id}`),

    // Stadiums
    getStadiums: () =>
        apiClient.get('/api/soccer/stadiums/all'),

    getStadiumById: (id: string) =>
        apiClient.get(`/api/soccer/stadiums/id/${id}`),

    createStadium: (stadium: any) =>
        apiClient.post('/api/soccer/stadiums', stadium),

    updateStadium: (id: string, stadium: any) =>
        apiClient.put(`/api/soccer/stadiums/${id}`, stadium),

    deleteStadium: (id: string) =>
        apiClient.delete(`/api/soccer/stadiums/${id}`),
};

// User Service API (필요시 확장)
export const userApi = {
    // User 관련 API 추가 가능
};

// Common Service API (필요시 확장)
export const commonApi = {
    // Common 관련 API 추가 가능
};

export default apiClient;

