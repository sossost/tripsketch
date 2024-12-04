import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../types/RootStack";
import { SetStateAction } from "react";
import { QUERY_KEY } from "../react-query/queryKey";
import { LINK } from "@constants/link";
import { getErrorMessage } from "@utils/errorHandler";
import axiosBase from "@services/axios";

export const useLikeMutation = (
  isLiked: boolean,
  setIsLiked: (value: SetStateAction<boolean>) => void,
  likes: number,
  setLikes: (value: SetStateAction<number>) => void
) => {
  const navigation = useNavigation<StackNavigation>();
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData([QUERY_KEY.CURRENT_USER]);

  const updateLikeStatus = async (postId: string) => {
    try {
      await axiosBase.post("trip/toggle-like", { id: postId });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  };

  const mutation = useMutation((postId: string) => updateLikeStatus(postId), {
    onMutate: () => {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
    },
    onSuccess: (postId) => {
      queryClient.invalidateQueries([QUERY_KEY.POST, postId]);
    },
    onError: () => {
      setIsLiked(isLiked);
      setLikes(isLiked ? likes + 1 : likes - 1);
    },
  });

  const handleLikePress = (postId: string) => {
    if (!currentUser) {
      navigation.navigate(LINK.KAKAO_LOGIN_PAGE);
      return;
    }
    mutation.mutate(postId);
  };

  return { handleLikePress };
};
