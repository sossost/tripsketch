export const API_PATH = {
  COMMENT: {
    GET: {
      // 모든 COMMENT 조회하기
      ALL: `/comment/comments`,
      // COMMENT TRIPID로 조회하기
      COMMENT_ID: `/comment/:tripId`,
    },
    POST: {
      // COMMENT TRIPID로 조회하기
      COMMENT: `/comment`,
    },
    PATCH: {
      // COMMENT CONTENT 댓글 수정하기
      COMMENT_CONTENT: `/comment/:id`,
      // COMMENT 댓글 좋아요
      COMMENT_LIKE: `/comment/:id/like`,
      // COMMENT CONTENT 대댓글 수정하기
      RECOMMENT_CONTENT: `/comment/:parentId/:id`,
      // COMMENT 대댓글 좋아요
      RECOMMENT_LIKE: `/comment/:parentId/:id/like`,
    },
    DELETE: {
      // 댓글 삭제하기
      COMMENT: `/comment/:id`,
      // 대댓글 삭제하기
      RECOMMENT: `/comment/:parentId/:id`,
    },
  },
};
