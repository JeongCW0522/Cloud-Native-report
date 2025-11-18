export const getUserInfo = (req, res, next) => {
  try {
    // 세션이 없으면 비로그인 상태
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: "로그인이 필요합니다.",
        data: null,
      });
    }

    const { id, name, email, createdAt, updatedAt } = req.session.user;

    // 🔹 요구한 응답 포맷에 맞게 반환
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "요청이 성공했습니다.",
      data: {
        id,
        name,
        email,
        createdAt,
        updatedAt,
      },
    });
  } catch (error) {
    console.error("유저 정보 조회 에러:", error);
    next(error);
  }
};
