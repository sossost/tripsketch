import { Post } from "../types/Post";
import { CreatePost } from "../types/Post";
import { API_PATH } from "../constants/path";
import axiosBase from "./axios";
import { PostsData } from "../hooks/usePostQuery";
import { getDataFromSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { errorLoging } from "../utils/getErrorMessage";

/**
 * @description : 닉네임과 카테고리로 해당 유저의 카테고리에 해당하는 게시글 리스트를 요청하는 함수
 *
 * @param nickname : 유저닉네임
 * @param category : 카테고리
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물수
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.1, 닉네임 undefined일 경우 분기처리, 에러 로깅 변경
 * @see None,
 */
export const getPostsByNickname = async (
  nickname: string | undefined,
  category: string,
  page: number,
  size: number
) => {
  if (!nickname) return;

  if (category === "전체보기") {
    try {
      const response = await axiosBase.get<PostsData>(
        `trip/nickname/tripsWithPagination/categories?nickname=${nickname}&page=${page}&pageSize=${size}`
      );
      return response.data;
    } catch (error: unknown) {
      errorLoging(error, "게시글 리스트 요청 에러는🤔");
    }
  }

  try {
    const response = await axiosBase.get<PostsData>(
      `trip/nickname/tripsWithPagination/country/${category}?nickname=${nickname}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "게시글 리스트 요청 에러는🤔");
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

export const createPost = async (postData: CreatePost) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  try {
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP, postData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postLike = async (id: string) => {
  try {
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP_LIKE, {
      id: id,
    });
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const postUnlike = async (id: string) => {
  try {
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP_UNLIKE, {
      id: id,
    });
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};
