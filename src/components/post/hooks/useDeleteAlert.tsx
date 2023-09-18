import { Alert } from "react-native";

type DeleteAlertProps = {
  id: string;
  deleteRequest: (postId: string) => Promise<void>;
  alertTitle: string;
  alertCancel: string;
  alertOk: string;
};

const useDeleteAlert = ({
  id,
  deleteRequest,
  alertTitle,
  alertCancel,
  alertOk,
}: DeleteAlertProps) => {
  const postDeleteHandler = () => {
    if (deleteRequest) {
      Alert.alert(
        "알림",
        alertTitle,
        [
          {
            text: alertCancel,
            style: "cancel",
          },
          {
            text: alertOk,
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
