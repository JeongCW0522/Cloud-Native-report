import type { RequestLogin, RequestSignup, ResponseLogin, ResponseSignup } from '@/types/auth';
import { axiosUserInstance } from './api';

// 회원가입 post 요청
export const postSignup = async (body: RequestSignup): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.post('/v1/auth/signup', body);

  return data;
};

// 로그인 post 요청
export const postLogin = async (body: RequestLogin): Promise<ResponseLogin> => {
  const { data } = await axiosUserInstance.post('/v1/auth/login', body);

  return data;
};

// 로그아웃 post 요청
export const postLogout = async () => {
  const { data } = await axiosUserInstance.post('/v1/auth/logout');

  return data;
};

// 유저 정보 조회 get 요청
export const getUserInfo = async (): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.get('/v1/users/me');

  return data;
};

// 유저 정보 수정 patch 요청
export const updateUserInfo = async (body: {
  name: string;
  email: string;
}): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.patch('/v1/users', body);

  return data;
};
