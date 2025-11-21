/**
 * 서비스 설정
 * API Gateway 및 각 마이크로서비스의 엔드포인트 설정
 */

// API Gateway URL 설정
// 브라우저에서는 항상 호스트의 포트를 사용 (localhost:8081)
// 서버 사이드에서는 discovery-server:8080 사용 가능
export const getApiGatewayUrl = () => {
    // 환경변수가 설정되어 있으면 사용
    if (process.env.NEXT_PUBLIC_API_GATEWAY_URL) {
        return process.env.NEXT_PUBLIC_API_GATEWAY_URL;
    }

    // 브라우저 환경에서는 항상 호스트 포트 사용
    // Docker에서 포트 매핑: 8081:8080
    if (typeof window !== 'undefined') {
        return 'http://localhost:8081';
    }

    // 서버 사이드 렌더링 (SSR) 환경 - Docker 네트워크 내부에서 실행
    return 'http://discovery-server:8080';
};

// 서비스 엔드포인트 경로
export const SERVICE_PATHS = {
    SOCCER: '/api/soccer',
    USER: '/api/user',
    COMMON: '/api/common',
} as const;

// API Gateway 기본 URL
export const API_GATEWAY_URL = getApiGatewayUrl();

