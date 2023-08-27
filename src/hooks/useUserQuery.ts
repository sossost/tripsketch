import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  followUser,
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
  unfollowUser,
} from "../services/user";
import { queryKeys } from "../react-query/constants";
import { User } from "../types/user";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../types/RootStack";

export const useGetCurrentUser = () => {
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
  } = useQuery<User | null>([queryKeys.currentUser], getCurrentUser);

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
  } = useQuery<User>([queryKeys.user, nickname], () =>
    getUserByNickname(nickname)
  );

  return { data, isLoading, isError };
};

export const useGetSocialList = (
  variant: "팔로워" | "팔로잉",
  nickname: string | undefined
) => {
  if (!nickname) return { data: [], isLoading: false, isError: false };

  const queryKey = [
    variant === "팔로워" ? queryKeys.followers : queryKeys.following,
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

      queryClient.invalidateQueries([queryKeys.currentUser]);
      queryClient.invalidateQueries([
        queryKeys.following,
        currentUser.nickname,
      ]);
      queryClient.invalidateQueries([queryKeys.user, nickname]);
      queryClient.invalidateQueries([queryKeys.followers, nickname]);
    } catch (error) {
      console.log(error);
    }
  };

  return followBtnHandler;
};
