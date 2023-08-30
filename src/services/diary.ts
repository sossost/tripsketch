import { Post } from "../types/Post";
import { API_PATH } from "../constants/path";
import axiosBase from "./axios";

export const getAllDiaries = async () => {
  return;
};

export const getPostsByNickname = async (
  nickname: string,
  category: string
) => {
  if (category === "전체보기") {
    try {
      const response = await axiosBase.get<Post[]>(
        `trip/nickname?nickname=${nickname}`
      );
      return response.data;
    } catch (error: any) {
      console.log("error :" + error);
    }
  }

  try {
    const response = await axiosBase.get<Post[]>(`trips/${nickname}`);
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

export const postLike = async (id: string) => {
  try {
    const data = {
      id: id,
    };
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP_LIKE, data);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const postUnlike = async (id: string) => {
  try {
    const data = {
      id: id,
    };
    const response = await axiosBase.post(API_PATH.TRIP.POST.TRIP_UNLIKE, data);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};
