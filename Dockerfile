# Node.js version 18을 기반 이미지로 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# src 디렉터리와 기타 프로젝트 파일 복사
COPY . .

# 포트 노출 (Express 서버 포트)
EXPOSE 3000

# 애플리케이션 시작 명령어
CMD ["node", "src/server.js"]