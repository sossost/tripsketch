import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCommentData,
  createComment,
  createReplyComment,
  updateCommentLike,
  updateReplyCommentLike,
  getCommentByTripId,
  getGuestCommentByTripId,
  updateComment,
  updateReplyComment,
  deleteComment,
  deleteReplyComment,
} from "../services/comment";
import { Comment } from "../types/comment";

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
    data: commentUserData = [],
    isLoading,
    isError,
  } = useQuery<Comment[]>(["commentTripId", tripId], () =>
    getCommentByTripId(tripId)
  );

  return { commentUserData, isLoading, isError };
};

export const getPostCommentGuestListByTripId = (tripId: string) => {
  const {
    data: commentGuestData = [],
    isLoading,
    isError,
  } = useQuery<Comment[]>(["commentGuestTripId", tripId], () =>
    getGuestCommentByTripId(tripId)
  );

  return { commentGuestData, isLoading, isError };
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
