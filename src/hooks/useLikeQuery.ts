import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../types/RootStack";
import { likePost, unLikePost } from "../services/like";
import { QUERY_KEY } from "../react-query/queryKey";

export const useLikePostController = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData([QUERY_KEY.CURRENT_USER]);

  const navigation = useNavigation<StackNavigation>();

  const likeMutation = useMutation(async (postId: string) => {
    await likePost(postId);
  });

  const unLikeMutation = useMutation(async (postId: string) => {
    await unLikePost(postId);
  });

  /** 팔로우 버튼 핸들러 */
  const likeBtnHandler = async (postId: string, isLiked: boolean) => {
    if (!currentUser) {
      navigation.navigate("KakaoLoginPage");
      return;
    }

    try {
      if (isLiked) {
        await unLikeMutation.mutateAsync(postId);
      } else {
        await likeMutation.mutateAsync(postId);
      }

      queryClient.invalidateQueries([QUERY_KEY.POST, postId]);
      queryClient.invalidateQueries([QUERY_KEY.POSTS]);
    } catch (error) {
      console.log(error);
    }
  };
};
