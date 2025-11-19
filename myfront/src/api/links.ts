import type { createLink, ResponseCreateLink, ResponseLinkList } from '@/types/links';
import { axiosLinkInstance } from './api';

// 링크 추가 post 요청
export const postLinks = async (linkData: createLink): Promise<ResponseCreateLink> => {
  const { data } = await axiosLinkInstance.post('/v1/links', linkData);

  return data;
};

// 링크 조회 get 요청
export const getLinks = async (search?: string): Promise<ResponseLinkList> => {
  const { data } = await axiosLinkInstance.get('/v1/links', {
    params: { search },
  });

  return data;
};

// 링크 상세 조회 get 요청
export const getLinkDetail = async (linkId: number): Promise<ResponseCreateLink> => {
  const { data } = await axiosLinkInstance.get(`/v1/links/${linkId}`);

  return data;
};

// 링크 상세 수정 patch 요청
export const updateLinkDetail = async (
  linkId: number,
  linkData: createLink,
): Promise<ResponseCreateLink> => {
  const { data } = await axiosLinkInstance.patch(`/v1/links/${linkId}`, linkData);

  return data;
};

// 요청 삭제 delete 요청
export const deleteLinkDetail = async (linkId: number) => {
  const { data } = await axiosLinkInstance.delete(`/v1/links/${linkId}`);

  return data;
};

// 즐겨찾기 수정 patch 요청
export const updateFavorite = async (id: number, favorite: boolean) => {
  const { data } = await axiosLinkInstance.patch(`/v1/links/${id}/favorite`, {
    favorite,
  });
  return data;
};
