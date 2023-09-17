import AuthGuard from "../components/auth/AuthGuard";
import PostPageComponent from "../components/post/PostPageComponent";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/RootStack";
import { View, Text } from "react-native";
import useGetPost from "../components/post/hooks/useGetPost";
import Loading from "../components/UI/Loading";

type UserScreenRouteProp = RouteProp<RootStackParamList, "UpdatePost">;

const UpdatePost = () => {
  const route = useRoute<UserScreenRouteProp>();
  const { postId } = route.params;
  const { isLoading, data: updateData } = useGetPost(postId);

  console.log(updateData);
  return (
    <AuthGuard>
      {isLoading ? (
        <View
          style={{
            display: "flex",
            alignItems: "center",
            paddingVertical: 100,
          }}
        >
          <Loading />
        </View>
      ) : !updateData ? (
        <Text>데이터가 없습니다.</Text>
      ) : (
        <PostPageComponent updateId={postId} updateData={updateData} />
      )}
    </AuthGuard>
  );
};

export default UpdatePost;
