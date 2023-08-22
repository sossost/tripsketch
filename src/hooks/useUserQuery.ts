import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
} from "../services/user";
import { queryKeys } from "../react-query/constants";
import { User } from "../types/user";

export const useGetCurrentUser = () => {
  const fallback = {
    id: "",
    email: "",
    nickname: "",
    introduction: "",
    profileImageUrl: "",
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
  };

  const {
    data = fallback as User,
    isLoading,
    isError,
  } = useQuery<User>([queryKeys.user], () => getUserByNickname(nickname));

  return { data, isLoading, isError };
};

export const useGetSocialList = (
  variant: "팔로워" | "팔로잉",
  nickname: string
) => {
  const queryKey = [variant, nickname];

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
