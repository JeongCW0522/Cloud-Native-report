import type { RequestLogin, RequestSignup, ResponseLogin, ResponseSignup } from '@/types/auth';
import { axiosUserInstance } from './api';

export const postSignup = async (body: RequestSignup): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.post('/v1/auth/signup', body);

  return data;
};

export const postLogin = async (body: RequestLogin): Promise<ResponseLogin> => {
  const { data } = await axiosUserInstance.post('/v1/auth/login', body);

  return data;
};

export const postLogout = async () => {
  const { data } = await axiosUserInstance.post('/v1/auth/logout');

  return data;
};

export const getUserInfo = async (): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.get('/v1/users/me');

  return data;
};

export const updateUserInfo = async (body: {
  name: string;
  email: string;
}): Promise<ResponseSignup> => {
  const { data } = await axiosUserInstance.patch('/v1/users', body);

  return data;
};
