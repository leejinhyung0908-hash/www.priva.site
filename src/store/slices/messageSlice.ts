import { StateCreator } from 'zustand';
import { soccerApi } from '@/lib/api';
import { Message } from '../types';
import { UISlice } from './uiSlice';

export interface MessageSlice {
    messages: {
        data: Message[];
        isLoading: boolean;
    };
    addMessage: (message: Message) => void;
    setMessages: (messages: Message[]) => void;
    clearMessages: () => void;
    sendMessage: (content: string) => Promise<void>;
}

export const createMessageSlice: StateCreator<
    MessageSlice & UISlice,
    [],
    [],
    MessageSlice
> = (set, get) => ({
    messages: {
        data: [
            {
                id: "1",
                role: "assistant",
                content: "축구 선수 정보를 검색할 수 있습니다.",
                timestamp: new Date(),
            },
        ],
        isLoading: false,
    },
    addMessage: (message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                data: [...state.messages.data, message],
            },
        })),
    setMessages: (messages) =>
        set((state) => ({
            messages: { ...state.messages, data: messages },
        })),
    clearMessages: () =>
        set((state) => ({
            messages: { ...state.messages, data: [] },
        })),
    sendMessage: async (content: string) => {
        const { addMessage, setLoading } = get();

        // 사용자 메시지 추가
        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: new Date(),
        };
        addMessage(userMessage);

        setLoading(true);

        try {
            const response = await soccerApi.getPlayers(content);
            const responseData = response.data?.message ||
                JSON.stringify(response.data, null, 2) ||
                '선수 데이터를 가져왔습니다.';

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `[검색 키워드: ${content}]\n\n${responseData}`,
                timestamp: new Date(),
            };
            addMessage(assistantMessage);
        } catch (error: any) {
            const errorDetails = error?.response
                ? `상태 코드: ${error.response.status}, 메시지: ${error.response.statusText}`
                : error?.message || '알 수 없는 오류';

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `서버 연결 오류: ${errorDetails}\n\n요청 URL: ${error?.config?.url || 'N/A'}\nBase URL: ${error?.config?.baseURL || 'N/A'}`,
                timestamp: new Date(),
            };
            addMessage(errorMessage);
        } finally {
            setLoading(false);
        }
    },
});

