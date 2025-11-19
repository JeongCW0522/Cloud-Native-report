import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import router from "./routes/link.route.js";
import uploadRouter from "./routes/upload.route.js";
import { sessionMiddleware } from "./middleware/session.js";

const app = express();
const PORT = 8002;

// Redis 세션 적용
app.use(sessionMiddleware);

// JSON 요청 파싱 (req.body 사용 가능)
app.use(express.json());

// CORS 설정
app.use(
  cors({
    origin: ["http://insightbox.com"],
    credentials: true,
  })
);

// URL 인코딩된 데이터 파싱
app.use(express.urlencoded({ extended: true }));

// 업로드된 이미지가 /uploads/ 경로로 접근 가능하도록 설정
app.use("/uploads", express.static("uploads"));

// 라우터 등록
app.use("/v1", uploadRouter);
app.use("/v1", router);

app.use(errorHandler); // 공통 에러 핸들러

// 테스트
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Link API is running" });
});

// 서버 실행, 0.0.0.0 → Docker 컨테이너 외부에서도 접근 가능
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Link API running on port ${PORT}`);
});
