import { Alert } from "react-native";

type DeleteAlertProps = {
  id?: string;
  commentParentId?: string;
  deleteRequest?: (id: string) => void;
  deleteParentIdRequest?: (id: string, parentId: string) => void;
  clearRequest?: () => void;
  backRequest?: any;
  alertTitle: string;
  alertCancel: string;
  alertOk: string;
};

const useDeleteAlert = ({
  id,
  commentParentId,
  deleteRequest,
  deleteParentIdRequest,
  clearRequest,
  backRequest,
  alertTitle,
  alertCancel,
  alertOk,
}: DeleteAlertProps) => {
  const postDeleteHandler = () => {
    if (deleteRequest || deleteParentIdRequest) {
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
              if (id !== undefined) {
                if (commentParentId && deleteParentIdRequest) {
                  deleteParentIdRequest(id, commentParentId);
                } else if (deleteRequest) {
                  deleteRequest(id);
                }
              } else {
                console.error("id is undefined");
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else if (clearRequest) {
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
              clearRequest();
              backRequest.goBack();
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
