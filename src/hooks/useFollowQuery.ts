import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StackNavigation } from "../types/RootStack";
import { QUERY_KEY } from "../react-query/queryKey";
import { followUser, unfollowUser } from "../services/user";
import { User } from "../types/user";
import { errorLoging } from "../utils/getErrorMessage";
import { errorToastMessage, successToastMessage } from "../utils/toastMessage";
import { LINK } from "../constants/link";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "../constants/message";

interface SocialControllerInSocialPageProps {
  currentUser: User | undefined;
  pageOwnerNickname: string;
  variant: "팔로워" | "팔로잉";
}

/**
 * @description : 소셜 페이지에서 팔로우, 언팔로우를 리액트쿼리 뮤테이션으로 컨트롤하는 커스텀 훅
 *
 * @param currentUser : 현재 로그인한 유저 데이터
 * @param pageOwnerNickname : 현재 유저페이지 주인의 닉네임
 * @param variant : 팔로워, 팔로잉 중 어떤 페이지에서 일어나는 로직인지
 *
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수,
 * @version 1.1.0, 로직 성공, 에러 메시지 상수화
 * @see None,
 */
export const useSocialControllerInSocialPage = ({
  currentUser,
  pageOwnerNickname,
  variant,
}: SocialControllerInSocialPageProps) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<StackNavigation>();

  // variant 별 쿼리키
  const queryKey =
    variant === "팔로워" ? QUERY_KEY.FOLLOWERS : QUERY_KEY.FOLLOWING;

  /** 팔로우 옵티미스틱 업데이트하는 뮤테이션 훅 */
  const followMutation = useMutation(
    async (nickname: string) => {
      await followUser(nickname);
    },
    {
      onMutate: (targetNickname) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          queryKey,
          pageOwnerNickname,
        ]);

        const newData = prevData?.map((user) => {
          if (user.nickname === targetNickname) {
            return { ...user, isFollowing: true };
          }
          return user;
        });
        queryClient.setQueryData([queryKey, pageOwnerNickname], newData);
      },
      onSuccess: () => {
        successToastMessage(
          `${pageOwnerNickname}님을 ${SUCCESS_MESSAGE.FOLLOW}`
        );
      },
      onError: (error: unknown) => {
        errorToastMessage(ERROR_MESSAGE.FOLLOW);
        errorLoging(error, "팔로우 요청 에러는🤔");
      },
    }
  );

  /** 언팔로우 옵티미스틱 업데이트하는 뮤테이션 훅 */
  const unfollowMutation = useMutation(
    async (nickname: string) => {
      await unfollowUser(nickname);
    },
    {
      onMutate: (targetNickname) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          queryKey,
          pageOwnerNickname,
        ]);

        const newData = prevData?.map((user) => {
          if (user.nickname === targetNickname) {
            return { ...user, isFollowing: false };
          }
          return user;
        });
        queryClient.setQueryData([queryKey, pageOwnerNickname], newData);
      },
      onSuccess: () => {
        successToastMessage(
          `${pageOwnerNickname}님 ${SUCCESS_MESSAGE.UNFOLLOW}`
        );
      },
      onError: (error: unknown) => {
        errorToastMessage(ERROR_MESSAGE.UNFOLLOW);
        errorLoging(error, "언팔로우 요청 에러는🤔");
      },
    }
  );

  /** 팔로우 버튼 핸들러 */
  const followBtnHandler = async (nickname: string, isFollowing: boolean) => {
    // 인증정보 없으면 로그인 페이지로 이동
    if (!currentUser) {
      errorToastMessage(ERROR_MESSAGE.UNAUTHORIZED);
      navigation.navigate(LINK.KAKAO_LOGIN_PAGE);
      return;
    }

    // 팔로우 여부에따라 팔로우, 언팔로우 뮤테이션 실행
    if (isFollowing) {
      await unfollowMutation.mutateAsync(nickname);
    } else {
      await followMutation.mutateAsync(nickname);
    }

    // 관련 데이터 캐시 무효화
    queryClient.invalidateQueries([queryKey, pageOwnerNickname]);
    queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
    queryClient.invalidateQueries([QUERY_KEY.FOLLOWING, currentUser.nickname]);
  };

  return followBtnHandler;
};

interface SocialControllerInUserPageProps {
  currentUser: User | undefined;
  pageOwner: User | undefined;
}

/**
 * @description : 소셜 페이지에서 팔로우, 언팔로우를 리액트쿼리 뮤테이션으로 컨트롤하는 커스텀 훅
 *
 * @param currentUser : 현재 로그인한 유저 데이터
 * @param pageOwner : 현재 유저페이지 주인의 데이터
 *
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수,
 * @version 1.1.0, 로직 성공, 에러 메시지 상수화
 * @see None,
 */
export const useSocialControllerInUserPage = ({
  currentUser,
  pageOwner,
}: SocialControllerInUserPageProps) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<StackNavigation>();

  /** 팔로우 옵티미스틱 업데이트하는 뮤테이션 훅 */
  const followMutation = useMutation(
    async (pageOwner: User) => {
      await followUser(pageOwner.nickname);
    },
    {
      onMutate: (pageOwner) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          QUERY_KEY.FOLLOWING,
          currentUser!.nickname,
        ]);

        const newData = [...(prevData ?? []), pageOwner];
        queryClient.setQueryData(
          [QUERY_KEY.FOLLOWING, currentUser!.nickname],
          newData
        );
      },
      onSuccess: () => {
        successToastMessage(
          `${pageOwner?.nickname}님을 ${SUCCESS_MESSAGE.FOLLOW}}`
        );
      },
      onError: (error: unknown) => {
        errorLoging(error, "팔로우 요청 에러는🤔");
        errorToastMessage(ERROR_MESSAGE.FOLLOW);
      },
    }
  );

  /** 언팔로우 옵티미스틱 업데이트하는 뮤테이션 훅 */
  const unfollowMutation = useMutation(
    async (pageOwner: User) => {
      await unfollowUser(pageOwner.nickname);
    },
    {
      onMutate: (pageOwner) => {
        const prevData: User[] | undefined = queryClient.getQueryData([
          QUERY_KEY.FOLLOWING,
          currentUser!.nickname,
        ]);

        const newData = prevData?.filter((user) => {
          return user.nickname !== pageOwner.nickname;
        });
        queryClient.setQueryData(
          [QUERY_KEY.FOLLOWING, currentUser!.nickname],
          newData
        );
      },
      onSuccess: () => {
        successToastMessage(
          `${pageOwner?.nickname}님 ${SUCCESS_MESSAGE.UNFOLLOW}}`
        );
      },
      onError: (error: unknown) => {
        errorLoging(error, "언팔로우 요청 에러는🤔");
        errorToastMessage(ERROR_MESSAGE.UNFOLLOW);
      },
    }
  );

  /** 팔로우 버튼 핸들러 */
  const followBtnHandler = async (isFollowing: boolean) => {
    // 페이지 주인의 데이터 없으면 리턴
    if (!pageOwner) return;

    // 인증정보 없으면 로그인 페이지로 이동
    if (!currentUser) {
      errorToastMessage(ERROR_MESSAGE.UNAUTHORIZED);
      navigation.navigate(LINK.KAKAO_LOGIN_PAGE);
      return;
    }

    // 팔로우 여부에따라 팔로우, 언팔로우 뮤테이션 실행
    if (isFollowing) {
      await unfollowMutation.mutateAsync(pageOwner);
    } else {
      await followMutation.mutateAsync(pageOwner);
    }

    // 관련 데이터 캐시 무효화
    queryClient.invalidateQueries([QUERY_KEY.USER, pageOwner.nickname]);
    queryClient.invalidateQueries([QUERY_KEY.FOLLOWING, currentUser.nickname]);
  };

  return followBtnHandler;
};
