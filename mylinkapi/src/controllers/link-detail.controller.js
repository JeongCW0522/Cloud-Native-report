import db from "../config/db.js";

// 링크 상세 조회
export const getLinkDetail = async (req, res, next) => {
  try {
    const { id } = req.params; // URL 파라미터에서 id 가져오기

    // id 유효성 검사
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "유효한 id를 전달해주세요.",
      });
    }

    // DB 조회
    const [rows] = await db.query("SELECT * FROM links WHERE id = ?", [id]);

    // 조회된 결과가 없으면 404 에러 반환
    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "해당 링크를 찾을 수 없습니다.",
      });
    }

    const link = rows[0];

    // 요청 성공 시 반환
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "요청이 성공했습니다.",
      data: {
        id: link.id,
        url: link.url,
        title: link.title,
        content: link.content,
        thumbnail: link.thumbnail,
        favorite: Boolean(link.favorite),
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
