import { useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  getFollowerList,
  getFollowingList,
  getUserByNickname,
} from "../services/user";
import { QUERY_KEY } from "../react-query/queryKey";
import { User } from "../types/user";

/**
 * @description : 현재 로그인한 유저의 정보를 요청하는 리액트 쿼리 훅
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const useGetCurrentUser = () => {
  const { data, isLoading, isError } = useQuery<User | undefined>(
    [QUERY_KEY.CURRENT_USER],
    getCurrentUser
  );

  return { data, isLoading, isError };
};

/**
 * @description : 닉네임으로 해당 유저의 정보를 요청하는 리액트 쿼리 훅
 *
 * @param nickname : 유저닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None,
 */
export const useGetUserByNickname = (nickname: string) => {
  const { data, isLoading, isError } = useQuery<User>(
    [QUERY_KEY.USER, nickname],
    () => getUserByNickname(nickname)
  );

  return { data, isLoading, isError };
};

/**
 * @description : 해당 페이지 유저의 팔로워 또는 팔로잉 리스트를 요청하는 리액트 쿼리 훅
 *
 * @param variant : 팔로워인지 팔로잉인지 variant
 * @param pageUserNickname : 페이지 유저의 닉네임
 *
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
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
  };

  const { data, isLoading, isError } = useQuery<User[] | undefined>(
    queryKey,
    queryFn
  );

  return { data, isLoading, isError };
};
