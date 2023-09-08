import { Post } from "../types/Post";
import { CreatePost } from "../types/Post";
import { API_PATH } from "../constants/path";
import axiosBase from "./axios";
import { PostsData } from "../hooks/usePostQuery";
import { getDataFromSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";

export const getAllDiaries = async () => {
  return;
};

export const getPostsByNickname = async (
  nickname: string,
  category: string,
  page: number,
  size: number
) => {
  if (category === "전체보기") {
    try {
      const response = await axiosBase.get<PostsData>(
        `trip/nickname/tripsWithPagination/categories?nickname=${nickname}&page=${page}&pageSize=${size}`
      );
      return response.data;
    } catch (error: any) {
      console.log("error :" + error);
    }
  }

  try {
    const response = await axiosBase.get<PostsData>(
      `trip/nickname/tripsWithPagination/country/${category}?nickname=${nickname}&page=${page}&size=${size}`
    );
    return response.data;
  } catch (error: any) {
    console.log("error :" + error);
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
