import { Post, GetPost, PostUpdate } from "../types/Post";
import { CreatePost } from "../types/Post";
import { API_PATH } from "../constants/path";
import axiosBase from "./axios";
import { PostsData } from "../hooks/usePostQuery";
import { getDataFromSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { errorLoging } from "../utils/errorHandler";
import { ERROR_MESSAGE } from "../constants/message";

/**
 * @description : 닉네임과 카테고리로 해당 유저의 카테고리에 해당하는 게시글 리스트를 요청하는 함수
 *
 * @param nickname : 유저닉네임
 * @param category : 카테고리
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물수
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.0.3, 로깅 및 에러메세지 수정
 * @see None,
 */
export const getPostsByNickname = async (
  nickname: string,
  category: string,
  page: number,
  size: number
) => {
  try {
    if (category === "전체보기") {
      const response = await axiosBase.get<PostsData>(
        `trip/nickname/tripsWithPagination/categories?nickname=${nickname}&page=${page}&pageSize=${size}`
      );
      return response.data;
    } else {
      const response = await axiosBase.get<PostsData>(
        `trip/nickname/tripsWithPagination/country/${category}?nickname=${nickname}&page=${page}&size=${size}`
      );
      return response.data;
    }
  } catch (error: unknown) {
    errorLoging(error, "게시글 리스트 요청 에러는🤔");
    throw new Error(ERROR_MESSAGE.GET_POSTS);
  }
};

/**
 * @description : 구독한 유저들의 게시글 리스트를 요청하는 함수
 *
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물 수
 *
 * @author : 장윤수
 * @update : 2023-09-16, try-catch -> 에러바운더리로 변경
 * @version 1.0.0,
 * @see None,
 */
export const getSubscribedUsersPosts = async (page: number, size: number) => {
  const response = await axiosBase.get(
    `trip/list/following?page=${page}&size=${size}`
  );
  return response.data;
};

/**
 * @description : 검색어와 정렬기준으로 게시글 리스트를 요청하는 함수
 *
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물 수
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.1.0, 페이지 네이션 기능 추가
 * @see None,
 */
export const getPostsByTrending = async (page: number, size: number) => {
  try {
    const response = await axiosBase.get(
      `trip/guest/trips?page=${page}&size=${size}&sortType=2`
    );
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "검색 게시글 리스트 요청 에러는🤔");
    throw new Error(ERROR_MESSAGE.GET_POSTS);
  }
};

/**
 * @description : 검색어와 정렬기준으로 게시글 리스트를 요청하는 함수
 *
 * @param keward : 검색 키워드
 * @param sorting : 정렬 기준
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물 수
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.1.0, 페이지 네이션 기능 추가
 * @see None,
 */
export const getSortedPostsBySearchKeyword = async (
  keward: string,
  sorting: "최신순" | "인기순" | "오래된순",
  page: number,
  size: number
) => {
  const sortingType = {
    최신순: 1,
    인기순: 2,
    오래된순: -1,
  };
  try {
    if (keward === "") {
      const response = await axiosBase.get(
        `trip/guest/trips?page=${page}&size=${size}&sortType=${sortingType[sorting]}`
      );
      return response.data;
    } else {
      const response = await axiosBase.get(
        `trip/guest/search?keyword=${keward}&page=${page}&size=${size}&sortType=${sortingType[sorting]}`
      );
      return response.data;
    }
  } catch (error: unknown) {
    errorLoging(error, "검색 게시글 리스트 요청 에러는🤔");
    throw new Error(ERROR_MESSAGE.GET_POSTS);
  }
};

export const getPostsById = async (id: string) => {
  try {
    const response = await axiosBase.get<Post>(
      `${API_PATH.TRIP.GET.TRIP_ID.replace(":id", id)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    console.log("error :" + error);
  }
};

export const getPostsAndComments = async (postId: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  try {
    const response = await axiosBase.get<GetPost>(
      `${API_PATH.TRIP.GET.TRIP_AND_COMMENT.replace(":tripId", postId)}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "게시글 상세페이지 요청 에러는🤔");
  }
};

export const getPostsAndCommentsForGuest = async (postId: string) => {
  try {
    const response = await axiosBase.get<GetPost>(
      `${API_PATH.TRIP.GET.TRIP_AND_COMMENT_GUEST.replace(":tripId", postId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "게시글 상세페이지 요청 에러는🤔");
  }
};

export const getUpdatePost = async (id: string) => {
  try {
    const response = await axiosBase.get<PostUpdate>(
      `${API_PATH.TRIP.GET.TRIP_UPDATE_DATA.replace(":id", id)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    console.error("게시글 상세페이지 요청 에러:", error);
    throw error;
  }
};

export const createPost = async (postData: CreatePost) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
  try {
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postLike = async (id: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
  try {
    const response = await axiosBase.post(
      API_PATH.TRIP.POST.TRIP_LIKE,
      { id },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postUnlike = async (id: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
  try {
    const response = await axiosBase.post(
      API_PATH.TRIP.POST.TRIP_UNLIKE,
      { id },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postUpdate = async (updateData: any) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  // 수정할 id updateData에서 추출
  const idValue = updateData["_parts"].find(([key]: string) => key === "id");
  const id = idValue ? idValue[1] : null;

  try {
    const response = await axiosBase.put(
      `${API_PATH.TRIP.PUT.TRIP.replace(":id", id)}`,
      updateData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deletePostById = async (id: string) => {
  try {
    const response = await axiosBase.delete(
      `${API_PATH.TRIP.DELETE.TRIP.replace(":id", id)}`
    );
    return response.data;
  } catch (error: any) {
    errorLoging(error, "게시글 삭제 요청 에러는🤔");
  }
};
