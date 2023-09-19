import AuthGuard from "../components/auth/AuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UpdatePost">;

const UpdatePost = () => {
  const route = useRoute<UserScreenRouteProp>();
  const { postId } = route.params;

  return (
    <AuthGuard>
      <PostPageComponent updateId={postId} />
    </AuthGuard>
  );
};

export default UpdatePost;
