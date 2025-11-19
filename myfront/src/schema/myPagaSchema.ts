import { z } from 'zod';

// 마이페이지용 스키마
export const myPageSchema = z.object({
  name: z.string().min(2, '이름은 최소 2글자 이상이어야 합니다.'),
  email: z.string().min(1, '이메일을 입력해주세요.').email('유효하지 않은 이메일 형식입니다.'),
});

export type myPageType = z.infer<typeof myPageSchema>;
