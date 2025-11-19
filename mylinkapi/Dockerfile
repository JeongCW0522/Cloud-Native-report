FROM node:22

# 컨테이너 내부 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json만 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

# 나머지 모든 프로젝트 파일을 컨테이너 내부로 복사
COPY . .

# uploads 폴더 생성 및 권한 설정
RUN mkdir -p uploads && chmod 777 uploads

# 컨테이너에서 노출할 포트 선언
EXPOSE 8002

# npm run dev → 개발 모드 서버 실행
CMD ["npm", "run", "dev"]