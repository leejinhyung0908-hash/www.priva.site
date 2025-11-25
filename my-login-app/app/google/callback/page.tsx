'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function GoogleCallbackPage() {
    const router = useRouter();
    const params = useSearchParams();
    const setToken = useAuthStore((state) => state.setToken);

    const code = params.get('code');

    useEffect(() => {
        if (!code) {
            console.error('❌ 구글 인증 코드 없음');
            router.replace('/');
            return;
        }

        console.log('✅ 구글글 인증 코드 받음:', code);

        // Gateway 호출
        fetch(`http://localhost:8080/oauth2/google/callback?code=${code}`, { method: 'GET', credentials: 'include' })
            .then(async (res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                console.log('✅ Gateway 응답 데이터:', data);

                // JWT 필드 우선 확인 (data.jwt || data.accessToken || data.access_token)
                const token = data.jwt || data.accessToken || data.access_token;
                console.log('✅ 추출된 토큰:', token ? `${token.substring(0, 20)}...` : '없음');

                if (token) {
                    // Zustand store에 저장 (자동으로 localStorage + Cookie도 저장됨)
                    setToken(token);

                    // 저장 확인 로그
                    console.log('✅ 토큰 저장 완료:');
                    console.log('  - Zustand store:', useAuthStore.getState().token ? '저장됨' : '저장 안됨');
                    console.log('  - localStorage:', localStorage.getItem('accessToken') ? '저장됨' : '저장 안됨');
                    console.log('  - Cookie:', document.cookie.includes('access_token') ? '저장됨' : '저장 안됨');

                    // 로그인 성공 로그 기록
                    fetch('/api/log/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: '로그인 성공',
                            url: window.location.href,
                            tokenLength: token.length,
                        }),
                    }).catch(() => { });

                    console.log('✅ 대시보드로 이동합니다...');
                    router.replace('/dashboard');
                } else {
                    console.error('❌ 토큰을 받지 못했습니다. 응답 데이터:', data);
                    router.replace('/');
                }
            })
            .catch((err) => {
                console.error('❌ Gateway 호출 실패:', err);
                router.replace('/');
            });
    }, [code, router, setToken]);

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">구글 로그인 처리 중...</p>
            </div>
        </div>
    );
}
