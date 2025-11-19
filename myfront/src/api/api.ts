import axios from 'axios';

// 사용자 관련 API 요청을 보낼 Axios 인스턴스 설정
export const axiosUserInstance = axios.create({
  baseURL: '/api/users',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 링크 관련 API 요청을 보낼 Axios 인스턴스 설정
export const axiosLinkInstance = axios.create({
  baseURL: '/api/links',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 401 인터셉터 공통 함수 - 401에러 시 로그인 페이지로 리다이렉트
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setupInterceptor = (instance: any) => {
  instance.interceptors.response.use(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error: any) => {
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    },
  );
};

setupInterceptor(axiosUserInstance);
setupInterceptor(axiosLinkInstance);
