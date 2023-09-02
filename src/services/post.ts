import { Post } from "../types/Post";
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
