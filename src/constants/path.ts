export const API_PATH = {
  USER: {
    GET: {
      BY_NICKNAME: `user/nickname/guest?nickname=:nickname`,
      BY_NICKNAME_AUTHED: `user/nickname?nickname=:nickname`,
    },
  },
  FOLLOWER_LIST: {
    GET: {
      BY_NICKNAME: `follow/user/followers?nickname=:nickname`,
    },
  },
  FOLLOWING_LIST: {
    GET: {
      BY_NICKNAME: `follow/user/followings?nickname=:nickname`,
    },
  },
  CATEGORY: {
    GET: {
      BY_NICKNAME: (nickname: string) =>
        `trip/nickname/trips/country-frequencies?nickname=${nickname}`,
    },
  },
  COMMENT: {
    GET: {
      // 모든 COMMENT 조회하기
      ALL: `/comment/admin/comments`,
      // COMMENT TRIPID로 조회하기
      COMMENT_ID: `/comment/user/:tripId`,
      // COMMENT TRIPID로 조회하기 :: 게스트
      COMMENT_GUEST_ID: `/comment/guest/:tripId`,
    },
    POST: {
      // COMMENT 댓글 생성하기
      COMMENT: `/comment`,
      // RECOMMENT 대댓글 생성하기
      RECOMMENT: `/comment/:parentId`,
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
  TRIP: {
    GET: {
      // TripId로 게시물 조회하기
      TRIP_ID: `/trip/guest/:id`,
      // Comment와 Trip 함께 조회하기
      TRIP_AND_COMMENT: `/trip/user/trip-comments/:tripId`,
      // Comment와 Trip 함께 조회하기 :: 게스트
      TRIP_AND_COMMENT_GUEST: `/trip/guest/trip-comments/:tripId`,
      // 업데이트 기존 데이터 조회하기
      TRIP_UPDATE_DATA: `/trip/modify/:id`,
    },
    POST: {
      // 게시물 생성하기
      TRIP: `/trip`,
      // 좋아요 추가하기
      TRIP_LIKE: `/trip/like`,
      // 좋아요 해제하기
      TRIP_UNLIKE: `/trip/unlike`,
      // 좋아요 토글
      TRIP_LIKE_TOGGLE: `/trip/toggle-like`,
    },
    PUT: {
      // 게시물 수정하기
      TRIP: `/trip/:id`,
    },
    DELETE: {
      // 게시물 삭제하기
      TRIP: `/trip/:id`,
    },
  },
  GEOCODING: {
    POST: {
      // 위도, 경도로 Location 데이터 생성하기
      GEOCODE: `/geocode`,
    },
  },
};
