import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../../../types/RootStack";
import { patchCurrentUser } from "../../../services/user";
import { QUERY_KEY } from "../../../react-query/queryKey";

import Toast from "react-native-toast-message";

interface ModifyProfileProps {
  profileImageUrl: string;
  nickname: string;
  introduction: string;
}

const useUpdateRrofile = (
  profileImageUrl: string,
  nickname: string,
  introduction: string
) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<StackNavigation>();

  /** 리액트 쿼리 뮤테이션 */
  const mutation = useMutation(
    (data: ModifyProfileProps) => patchCurrentUser(data),
    {
      onSuccess: () => {
        Toast.show({ type: "success", text1: "프로필 변경이 완료되었습니다." });
        navigation.goBack();

        // 프로필이 변경되었으므로, currentUser 쿼리를 다시 가져오도록 갱신
        queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
      },
      onError: (error) => {
        Toast.show({ type: "error", text1: "프로필 변경에 실패하였습니다." });
      },
    }
  );

  /** 프로필 수정 제출 함수 */
  const handleProfileSubmit = async () => {
    const data = {
      profileImageUrl,
      nickname,
      introduction,
    };

    // 리액트 쿼리의 mutation을 호출하여 데이터 업데이트
    mutation.mutate(data);
  };

  return handleProfileSubmit;
};

export default useUpdateRrofile;
