import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
} from "../services/user";
import { QUERY_KEY } from "../react-query/queryKey";
import { User } from "../types/user";

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
  };

  const fallback: User[] = [];

  const {
    data = fallback,
    isLoading,
    isError,
  } = useQuery<User[] | undefined>(queryKey, queryFn);

  return { data, isLoading, isError };
};
