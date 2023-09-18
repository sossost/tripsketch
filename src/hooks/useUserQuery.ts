import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
  getUserByNicknameAuthed,
  patchCurrentUser,
} from "../services/user";
import { QUERY_KEY } from "../react-query/queryKey";
import { User } from "../types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types/RootStack";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import validationCheck from "../utils/validationCheck";
import { VALIDATION, VALIDATION_ERROR_MESSAGE } from "../constants/validation";

/**
 * @description : 현재 로그인한 유저의 정보를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-13, 쿼리데이터 undefined대신 null 반환하도록 수정
 * @version 1.0.1,
 * @see None,
 */
export const useGetCurrentUser = () => {
  const {
    data = null,
    isLoading,
    isError,
  } = useQuery<User | null>([QUERY_KEY.CURRENT_USER], getCurrentUser, {
    suspense: false,
    useErrorBoundary: false,
  });

  return { data, isLoading, isError };
};

/**
 * @description : 닉네임으로 해당 유저의 정보를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-16, 쿼리옵션 전역 변경, 비동기 바운더리 사용
 * @version 1.0.1,
 * @see None,
 */
export const useGetUserByNickname = (nickname: string) => {
  const queryKey = [QUERY_KEY.USER, nickname];

  const { data: currentUser } = useGetCurrentUser();

  const queryFn = currentUser
    ? () => getUserByNicknameAuthed(nickname)
    : () => getUserByNickname(nickname);

  const { data = null } = useQuery<User | null>(queryKey, queryFn, {
    enabled: !!nickname,
  });

  return { data };
};

/**
 * @description : 해당 페이지 유저의 팔로워 또는 팔로잉 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param variant : 팔로워인지 팔로잉인지 variant
 * @param pageUserNickname : 페이지 유저의 닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-16, 비동기 바운더리로 처리
 * @version 1.0.2,
 * @see None,
 */
export const useGetSocialList = (
  variant: "팔로워" | "팔로잉",
  pageUserNickname: string
) => {
  const queryKey = [
    variant === "팔로워" ? QUERY_KEY.FOLLOWERS : QUERY_KEY.FOLLOWING,
    pageUserNickname,
  ];

  const queryFn = () => {
    if (variant === "팔로워") {
      return getFollowerList(pageUserNickname);
    }
    if (variant === "팔로잉") {
      return getFollowingList(pageUserNickname);
    }
    return null;
  };

  const { data = null } = useQuery<User[] | null>(queryKey, queryFn, {
    enabled: !!pageUserNickname,
  });

  return { data };
};

/**
 * @설명 : 리액트 쿼리 뮤테이션을 사용한 유저 프로필 수정 커스텀 훅
 * @작성자 : 장윤수
 * @작성일 : 2023-09-18
 * @version 1.0.1, 파일 이동
 * @see None
 */
export const useUpdateRrofile = (
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
