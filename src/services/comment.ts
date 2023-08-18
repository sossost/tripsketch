import axios from "axios";
import { axiosBase } from "../../api/axios";

export const getCommentData = async () => {
  try {
    const response = await axiosBase.get("/api/comment/comments");
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error");
  }
};
