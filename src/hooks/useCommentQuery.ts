import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCommentData,
  createComment,
  createReplyComment,
  updateCommentLike,
  updateReplyCommentLike,
  getCommentByTripId,
  updateComment,
  updateReplyComment,
  deleteComment,
  deleteReplyComment,
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

export const getUpdateReplyCommentLike = () => {
  return useMutation(updateReplyCommentLike);
};

export const getUpdateComment = () => {
  return useMutation(updateComment);
};

export const getUpdateReplyComment = () => {
  return useMutation(updateReplyComment);
};

export const getDeleteComment = () => {
  return useMutation(deleteComment);
};

export const getDeleteReplyComment = () => {
  return useMutation(deleteReplyComment);
};
