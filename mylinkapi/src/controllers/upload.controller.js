import path from "path";
import multer from "multer";

// 저장 경로 및 파일명 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 현재 프로젝트 내 uploads/ 폴더에 저장
  },

  // 저장될 파일명 설정 (중복 방지)
  filename: (req, file, cb) => {
    // 파일명을 시간 기반 + 랜덤 숫자 + 원본 확장자 형태로 생성
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName); // 저장될 파일명 전달
  },
});

// multer에 limits 옵션 추가 (파일 최대 5MB)
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single("file");

// 실제 이미지 업로드 처리
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "파일이 업로드되지 않았습니다.",
    });
  }

  // 환경변수 PUBLIC_URL이 있으면 절대 URL 사용 (운영 서버)
  // 없으면 기존 방식 사용 (로컬 개발)
  const PUBLIC_URL = process.env.PUBLIC_URL;
  const hostUrl = PUBLIC_URL
    ? PUBLIC_URL
    : `${req.protocol}://${req.get("host")}`;

  const imageUrl = `${hostUrl}/uploads/${req.file.filename}`; // 최종 이미지 URL

  //성공 시 반환
  return res.status(201).json({
    status: true,
    statusCode: 201,
    message: "이미지 업로드 성공.",
    data: {
      imageUrl,
    },
  });
};
