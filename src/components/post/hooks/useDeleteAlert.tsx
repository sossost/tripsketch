import { Alert } from "react-native";

type DeleteAlertProps = {
  id: string;
  deleteRequest: (postId: string) => Promise<void>;
};

const useDeleteAlert = ({ id, deleteRequest }: DeleteAlertProps) => {
  const postDeleteHandler = () => {
    if (deleteRequest) {
      Alert.alert(
        "알림",
        "정말 삭제하시겠습니까?",
        [
          {
            text: "괜찮습니다.",
            style: "cancel",
          },
          {
            text: "삭제",
            onPress: () => {
              deleteRequest(id);
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  return postDeleteHandler;
};

export default useDeleteAlert;
