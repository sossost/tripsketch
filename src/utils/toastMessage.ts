import { Toast } from "react-native-toast-message/lib/src/Toast";

/**
 * @description : success 토스트 메세지 출력하는 함수
 *
 * @param message : 띄워줄 메세지
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const successToastMessage = (message: string) => {
  Toast.show({
    type: "success",
    text1: message,
  });
};

/**
 * @description : error 토스트 메세지 출력하는 함수
 *
 * @param message : 띄워줄 메세지
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const errorToastMessage = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
  });
};
