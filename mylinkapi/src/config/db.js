import mysql from "mysql2/promise";

// MySQL 연결 풀(Pool) 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  user: process.env.DB_USER || "mysql_db",
  password: process.env.DB_PASSWORD || "123456",
  database: process.env.DB_NAME || "mysql_db",
  waitForConnections: true, // 연결 요청이 몰릴 경우 큐에 넣고 기다리도록 설정
  connectionLimit: 10, // 동시에 유지할 수 있는 최대 연결 수
  queueLimit: 0, // 큐 제한 (0 = 제한 없음)
  charset: "utf8mb4", // UTF-8 + 이모지까지 지원하는 문자셋
});

// 데이터베이스 연결 테스트
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL 데이터베이스 연결 성공!");
    connection.release();
  } catch (err) {
    console.error("❌ MySQL 연결 실패:", err.message);
    // 재시도 로직
    setTimeout(testConnection, 5000);
  }
};

testConnection();

export default pool;
