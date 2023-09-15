import PostView from "./components/post/PostView";
import { useQueryClient } from "@tanstack/react-query";
import { usePostDelete } from "../../hooks/usePostQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import Toast from "react-native-toast-message";

const PostViewContainer = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  // 게시글 삭제하기
  const postDeleteMutation = usePostDelete();
  const postDelete = async (postId: string) => {
    try {
      await postDeleteMutation.mutateAsync(postId);
      queryClient.invalidateQueries(["posts"]);
      Toast.show({ type: "success", text1: "게시글 삭제가 완료되었습니다." });
      navigation.goBack();
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return <PostView postId={postId} deletePost={postDelete}></PostView>;
};

export default PostViewContainer;
