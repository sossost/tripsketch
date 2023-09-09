import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../../../types/RootStack";
import { patchCurrentUser } from "../../../services/user";
import { QUERY_KEY } from "../../../react-query/queryKey";
import validationCheck from "../../../utils/validationCheck";
import {
  VALIDATION,
  VALIDATION_ERROR_MESSAGE,
} from "../../../constants/validation";

import Toast from "react-native-toast-message";

/**
 * @설명 : 리액트 쿼리 뮤테이션을 사용한 유저 프로필 수정 커스텀 훅
 * @작성자 : 장윤수
 * @작성일 : 2023-09-10
 * @version 1.0, 발리데이션 체크 추가
 * @see None
 */

const useUpdateRrofile = (
  profileImageUrl: string,
  nickname: string,
  introduction: string
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  /** 리액트 쿼리 뮤테이션 */
  const mutation = useMutation((data: any) => patchCurrentUser(data), {
    onSuccess: () => {
      Toast.show({ type: "success", text1: "프로필 변경이 완료되었습니다." });
      navigation.goBack();

      // 프로필이 변경되었으므로, currentUser 쿼리를 다시 가져오도록 갱신
      queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "프로필 변경에 실패하였습니다." });
    },
  });

  /** 프로필 수정 제출 함수 */
  const handleProfileSubmit = async () => {
    if (!validationCheck({ value: nickname, regex: VALIDATION.NICKNAME })) {
      Toast.show({ type: "error", text1: VALIDATION_ERROR_MESSAGE.NICKNAME });
      return;
    }

    if (
      !validationCheck({ value: introduction, regex: VALIDATION.INTRODUCTION })
    ) {
      Toast.show({
        type: "error",
        text1: VALIDATION_ERROR_MESSAGE.INTRODUCTION,
      });
      return;
    }

    const formData: any = new FormData();
    formData.append("nickname", nickname);
    formData.append("introduction", introduction);
    formData.append("profileImageUrl", {
      uri: profileImageUrl,
      name: "profileImage",
      type: "multipart/form-data",
    });

    // 리액트 쿼리의 mutation을 호출하여 데이터 업데이트
    mutation.mutate(formData);
  };

  return handleProfileSubmit;
};

export default useUpdateRrofile;
