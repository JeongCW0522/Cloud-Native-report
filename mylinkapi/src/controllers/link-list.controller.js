import db from "../config/db.js";

// 링크 전체 조회 (세션 검사 + 사용자별 데이터 필터링)
export const getAllLinks = async (req, res, next) => {
  try {
    // 1) 세션 체크
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "로그인이 필요합니다.",
        data: null,
      });
    }

    // 2) 세션에서 userId 가져오기
    const userId = req.session.user.id;

    const { search } = req.query;

    // 기본 쿼리: 로그인한 사용자 본인의 링크만 조회
    let query = `
      SELECT id, url, title, content, thumbnail, favorite, createdAt, updatedAt 
      FROM links
      WHERE userId = ?
    `;
    let params = [userId];

    // 검색어 있을 때
    if (search && search.trim() !== "") {
      const likeValue = `%${search}%`;
      query += ` AND (title LIKE ? OR content LIKE ?)`;
      params.push(likeValue, likeValue);
    }

    // 최신순 정렬
    query += ` ORDER BY createdAt DESC`;

    const [rows] = await db.query(query, params);

    // 요청 성공 시 반환
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "요청이 성공했습니다.",
      data: rows.map((item) => ({
        id: item.id,
        url: item.url,
        title: item.title,
        content: item.content,
        thumbnail: item.thumbnail,
        favorite: Boolean(item.favorite),
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};
