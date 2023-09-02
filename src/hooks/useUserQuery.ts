import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followUser,
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
  unfollowUser,
} from "../services/user";
import { QUERY_KEY } from "../react-query/queryKey";
import { User } from "../types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types/RootStack";

export const useGetCurrentUser = () => {
  const fallback = null;

  const {
    data = fallback as User | null,
    isLoading,
    isError,
  } = useQuery<User | null>([QUERY_KEY.CURRENT_USER], getCurrentUser);

  return { data, isLoading, isError };
};

export const useGetUserByNickname = (nickname: string) => {
  const fallback = {
    id: "",
    email: "",
    nickname: "",
    introduction: "",
    profileImageUrl: "",
    followersCount: 0,
    followingCount: 0,
  };

  const {
    data = fallback as User,
    isLoading,
    isError,
  } = useQuery<User>([QUERY_KEY.USER, nickname], () =>
    getUserByNickname(nickname)
  );

  return { data, isLoading, isError };
};

export const useGetSocialList = (
  variant: "팔로워" | "팔로잉",
  nickname: string
) => {
  const queryKey = [
    variant === "팔로워" ? QUERY_KEY.FOLLOWERS : QUERY_KEY.FOLLOWING,
    nickname,
  ];

  const queryFn = () => {
    if (variant === "팔로워") {
      return getFollowerList(nickname);
    }
    if (variant === "팔로잉") {
      return getFollowingList(nickname);
    }
  };

  const fallback: User[] = [];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<User[] | undefined>(queryKey, queryFn);

  return { data, isLoading, isError };
};

export const useSocialController = (currentUser: User | null) => {
  const queryClient = useQueryClient();

  const navigation = useNavigation<StackNavigation>();

  const followMutation = useMutation(async (nickname: string) => {
    await followUser(nickname);
  });

  const unfollowMutation = useMutation(async (nickname: string) => {
    await unfollowUser(nickname);
  });

  /** 팔로우 버튼 핸들러 */
  const followBtnHandler = async (nickname: string, isFollowing: boolean) => {
    if (!currentUser) {
      navigation.navigate("KakaoLoginPage");
      return;
    }

    try {
      if (isFollowing) {
        await unfollowMutation.mutateAsync(nickname);
      } else {
        await followMutation.mutateAsync(nickname);
      }

      queryClient.invalidateQueries([QUERY_KEY.CURRENT_USER]);
      queryClient.invalidateQueries([
        QUERY_KEY.FOLLOWING,
        currentUser.nickname,
      ]);
      queryClient.invalidateQueries([QUERY_KEY.USER, nickname]);
      queryClient.invalidateQueries([QUERY_KEY.FOLLOWERS, nickname]);
    } catch (error) {
      console.log(error);
    }
  };

  return followBtnHandler;
};
