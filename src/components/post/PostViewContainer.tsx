import PostView from "./components/post/PostView";
import { useQueryClient } from "@tanstack/react-query";
import { usePostDelete } from "../../hooks/usePostQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types/RootStack";
import { GetPost } from "../../types/Post";
import { QUERY_KEY } from "../../react-query/queryKey";
import { useGetCurrentUser } from "../../hooks/useUserQuery";
import Toast from "react-native-toast-message";

type postViewProps = {
  postId: string;
  postData: GetPost["tripAndCommentPairDataByTripId"]["first"];
};

const PostViewContainer = ({ postId, postData }: postViewProps) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();
  const { data: userData } = useGetCurrentUser();
  const nickname = userData?.nickname;

  // 게시글 삭제하기
  const postDeleteMutation = usePostDelete();
  const postDelete = async (postId: string) => {
    try {
      await postDeleteMutation.mutateAsync(postId);
      queryClient.invalidateQueries(["posts"]);
      queryClient.invalidateQueries([QUERY_KEY.POSTS, nickname]);
      queryClient.invalidateQueries([QUERY_KEY.CATEGORIES, nickname]);
      Toast.show({ type: "success", text1: "게시글 삭제가 완료되었습니다." });
      navigation.goBack();
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <PostView postId={postId} deletePost={postDelete} postData={postData} />
  );
};

export default PostViewContainer;
