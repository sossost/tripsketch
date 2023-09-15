import { useQueryClient } from "@tanstack/react-query";
import { usePostDelete } from "../../../hooks/usePostQuery";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types/RootStack";
import Toast from "react-native-toast-message";

const useDeletePost = async (id: string) => {
  const postDeleteMutation = usePostDelete();
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  try {
    await postDeleteMutation.mutateAsync(id);

    queryClient.invalidateQueries(["posts"]);
    Toast.show({ type: "success", text1: "게시물 삭제가 완료되었습니다." });
    navigation.goBack();
  } catch (error) {
    console.error("오류 발생:", error);
  }
};

export default useDeletePost;
