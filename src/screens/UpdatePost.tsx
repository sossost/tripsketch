import AuthGuard from "../components/auth/AuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";
import { Text } from "react-native";
import useGetPost from "../components/post/hooks/useGetPost";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UpdatePost">;

const UpdatePost = () => {
  const route = useRoute<UserScreenRouteProp>();
  const { postId } = route.params;
  const { isLoading, data: updateData } = useGetPost(postId);

  return (
    <AuthGuard>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : !updateData ? (
        <Text>데이터가 없습니다.</Text>
      ) : (
        <PostPageComponent updateId={postId} updateData={updateData} />
      )}
    </AuthGuard>
  );
};

export default UpdatePost;
