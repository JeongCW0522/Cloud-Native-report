import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import router from "./routes/user.route.js";
import { sessionMiddleware } from "./middleware/session.js";

const app = express();
const PORT = 8001;

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

app.use("/v1", router); // 라우터 등록
app.use(errorHandler); // 공통 에러 핸들러

// 테스트
app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Link API is running" });
});

// 서버 실행
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Link API running on port ${PORT}`);
});
