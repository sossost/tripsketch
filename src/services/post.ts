import axiosBase from "@services/axios";
import { API_PATH } from "@constants/path";
import { ERROR_MESSAGE } from "@constants/message";
import { errorLoging } from "@utils/errorHandler";
import { Post, GetPost, PostUpdate } from "@types/Post";
import { CreatePost } from "@types/Post";
import { getAccessToken } from "@utils/token";

/**
 * @description : 닉네임과 카테고리로 해당 유저의 카테고리에 해당하는 게시글 리스트를 요청하는 함수
 *
 * @param nickname : 유저닉네임
 * @param category : 카테고리
 * @param page : 요청할 페이지
 * @param size : 페이지당 게시물수
 *
 * @author : 장윤수
 * @update : 2023-09-22,
 * @version 1.0.4, 토큰 관련 함수 변경
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
      const response = await axiosBase.get(
        `trip/nickname/trips-pagination/categories?nickname=${nickname}&page=${page}&pageSize=${size}`
      );
      return response.data;
    } else {
      const response = await axiosBase.get(
        `trip/nickname/trips-pagination/country/${category}?nickname=${nickname}&page=${page}&size=${size}`
      );
      return response.data;
    }
  } catch (error: unknown) {
    errorLoging(error, "게시글 리스트 요청 에러는🤔");
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
  const accessToken = await getAccessToken();
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
    return null;
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
  const accessToken = await getAccessToken();
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
  const accessToken = await getAccessToken();
  try {
    const response = await axiosBase.post(
      API_PATH.TRIP.POST.TRIP_LIKE_TOGGLE,
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

export const postUpdate = async (updateData: any) => {
  const accessToken = await getAccessToken();

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
