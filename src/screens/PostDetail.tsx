import PostDetailPageComponent from "../components/post/PostDetailPageComponent";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";
import AsyncBoundary from "../components/common/AsyncBoundary";

type TripDetailScreenRouteProp = RouteProp<RootStackParamList, "PostDetail">;

const PostDetail = () => {
  // 라우터에서 받아온 파라미터 값 저장
  const route = useRoute<TripDetailScreenRouteProp>();
  const { postId } = route.params;
  return (
    <AsyncBoundary>
      <PostDetailPageComponent postId={postId}></PostDetailPageComponent>
    </AsyncBoundary>
  );
};

export default PostDetail;
