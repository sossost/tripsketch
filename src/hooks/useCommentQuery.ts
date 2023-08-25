import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCommentData,
  createComment,
  createReplyComment,
  updateCommentLike,
  getCommentByTripId,
} from "../services/comment";

export const getPostCommentList = () => {
  const {
    data: commentData,
    isLoading,
    isError,
  } = useQuery(["comment"], getCommentData);

  return { commentData, isLoading, isError };
};

export const getPostCommentListByTripId = (tripId: string) => {
  const {
    data: commentData,
    isLoading,
    isError,
  } = useQuery(["commentTripId", tripId], () => getCommentByTripId(tripId));

  return { commentData, isLoading, isError };
};

export const getCreateComment = () => {
  return useMutation(createComment);
};

export const getCreateReplyComment = () => {
  return useMutation(createReplyComment);
};

export const getUpdateCommentLike = () => {
  return useMutation(updateCommentLike);
};
