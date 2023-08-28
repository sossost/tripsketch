import { API_PATH } from "../constants/path";
import axiosBase from "./axios";

export const getCommentData = async () => {
  try {
    const response = await axiosBase.get(API_PATH.COMMENT.GET.ALL);
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error");
  }
};

export const getCommentByTripId = async (tripId: string) => {
  try {
    const response = await axiosBase.get(
      `${API_PATH.COMMENT.GET.COMMENT_ID.replace(":tripId", tripId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Error");
  }
};

interface CommentData {
  tripId: string;
  content: string;
}

export const createComment = async (commentData: CommentData) => {
  try {
    const response = await axiosBase.post(
      API_PATH.COMMENT.POST.COMMENT,
      commentData
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface ReplyCommentData {
  tripId: string;
  content: string;
  replyToNickname: string;
  parentId: string;
}

export const createReplyComment = async (
  replyCommentData: ReplyCommentData
) => {
  try {
    const updatedCommentData = {
      tripId: replyCommentData.tripId,
      content: replyCommentData.content,
      replyToNickname: replyCommentData.replyToNickname,
    };
    const response = await axiosBase.post(
      `${API_PATH.COMMENT.POST.RECOMMENT.replace(
        ":parentId",
        replyCommentData.parentId
      )}`,
      updatedCommentData
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

export const updateCommentLike = async (likeCommentId: string) => {
  try {
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.COMMENT_LIKE.replace(":id", likeCommentId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};

interface ReplyCommentLikeData {
  likeReplyCommentId: string;
  parentId: string;
}

export const updateReplyCommentLike = async (
  replyCommentData: ReplyCommentLikeData
) => {
  try {
    console.log(replyCommentData);
    const response = await axiosBase.patch(
      `${API_PATH.COMMENT.PATCH.RECOMMENT_LIKE.replace(
        ":id",
        replyCommentData.likeReplyCommentId
      ).replace(":parentId", replyCommentData.parentId)}`
    );
    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error");
  }
};
