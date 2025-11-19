// 응답 공통 타입 정의
export type CommonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type ResponseUploadUrl = CommonResponse<{ imageUrl: string }>;
