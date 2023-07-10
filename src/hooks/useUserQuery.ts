import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  getFollowerList,
  getFollowingList,
} from "../services/user";
import { queryKeys } from "../react-query/constants";

export const useGetCurrentUser = () => {
  const { data: currentUser } = useQuery(
    [queryKeys.currentUser],
    getCurrentUser
  );

  return { currentUser };
};

export const useGetSocialList = (
  variant: "팔로워" | "팔로잉",
  userName: string
) => {
  const queryKey = [variant, userName];

  const queryFn = () => {
    if (variant === "팔로워") {
      return getFollowerList(userName);
    }
    if (variant === "팔로잉") {
      return getFollowingList(userName);
    }
  };

  const fallback: User[] | undefined = [];

  const {
    data: users = fallback,
    isLoading,
    isError,
  } = useQuery<User[] | undefined>(queryKey, queryFn);

  return { users, isLoading, isError };
};
