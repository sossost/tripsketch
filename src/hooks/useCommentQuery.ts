import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCommentData,
  createComment,
  updateCommentLike,
} from "../services/comment";

export const getPostCommentList = () => {
  const {
    data: commentData,
    isLoading,
    isError,
  } = useQuery(["comment"], getCommentData);

  return { commentData, isLoading, isError };
};

export const getCreateComment = () => {
  return useMutation(createComment);
};

export const getUpdateCommentLike = () => {
  return useMutation(updateCommentLike);
};
