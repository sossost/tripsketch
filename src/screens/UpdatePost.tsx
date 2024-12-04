import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";

import PostPageComponent from "@components/post/PostPageComponent";
import withAuthGuard from "@components/auth/withAuthGuard";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UpdatePost">;

const UpdatePost = () => {
  const route = useRoute<UserScreenRouteProp>();
  const { postId } = route.params;

  return <PostPageComponent updateId={postId} />;
};

export default withAuthGuard(UpdatePost);
