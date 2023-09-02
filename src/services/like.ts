import axiosBase from "./axios";

export const likePost = async (postId: string) => {
  await axiosBase.post("trip/like", { id: postId });
};

export const unLikePost = async (postId: string) => {
  await axiosBase.post("trip/unlike", { id: postId });
};
