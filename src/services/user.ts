import axios from "axios";
import { axiosBase } from "./axios";
import { API_BASE_URL } from "@env";
import { User } from "../types/user";
import { getDataFromSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { errorLoging, errorToastMessageInCatch } from "../utils/errorHandler";
import { ERROR_MESSAGE } from "../constants/message";

/**
 * @description : 카카오 로그인 요청하는 함수
 * @author : 장윤수
 * @update : 2023-09-21,
 * @version 1.0.0,
 * @see None
 */
export const kakaoLogin = async () => {
  return await axiosBase.get("oauth/kakao/redirect");
};

/**
 * @description : 로그인한 유저의 정보를 요청하는 함수
 * @author : 이수현
 * @update : 2023-09-13, 데이터 패치 실패 시 null 반환하도록 수정
 * @version 1.1.1,
 * @see None
 */
export const getCurrentUser = async () => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
  const pushToken = await getDataFromSecureStore(STORE_KEY.PUSH_TOKEN);

  try {
    if (accessToken) {
      const response = await axiosBase.get(`user?token=${pushToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data as User;
    }
    return null;
  } catch (error: unknown) {
    errorToastMessageInCatch(
      "유저 정보 요청에 실패했습니다. 다시 로그인 해주세요."
    );
    errorLoging(error, "로그인한 유저 정보 요청 에러는🤔");
    return null;
  }
};

/**
 * @description : 유저 정보 patch 요청하는 함수
 * @author : 장윤수
 * @update : 2023-09-16, try-catch -> 에러바운더리로 변경
 * @version 1.1.2,
 * @see None
 */
export const patchCurrentUser = async (data: any) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  try {
    if (accessToken) {
      const response = await axios.patch(`${API_BASE_URL}user`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    }
    throw new Error(ERROR_MESSAGE.UNAUTHORIZED);
  } catch (error: unknown) {
    errorLoging(error, "유저 정보 수정 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저의 팔로우 리스트를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.2,
 * @see None
 */
export const getFollowerList = async (nickname: string) => {
  const response = await axiosBase.get(
    `follow/user/followers?nickname=${nickname}`
  );
  return response.data;
};

/**
 * @description : 닉네임으로 해당 유저의 팔로잉 리스트를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.1,
 * @see None
 */
export const getFollowingList = async (nickname: string) => {
  const response = await axiosBase.get(
    `follow/user/followings?nickname=${nickname}`
  );
  return response.data;
};

/**
 * @description : 비로그인시 닉네임으로 해당 유저의 정보를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.1,
 * @see None
 */
export const getUserByNickname = async (nickname: string) => {
  const response = await axiosBase.get(
    `user/nickname/guest?nickname=${nickname}`
  );
  return response.data;
};

/**
 * @description : 로그인시 닉네임으로 해당 유저의 정보를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.0.1,
 * @see None
 */
export const getUserByNicknameAuthed = async (nickname: string) => {
  const response = await axiosBase.get(`user/nickname?nickname=${nickname}`);
  return response.data;
};

/**
 * @description : 닉네임으로 해당 유저를 팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.1,
 * @see None
 */
export const followUser = async (nickname: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  if (accessToken) {
    const response = await axiosBase.post(
      "follow",
      { nickname },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  throw new Error(ERROR_MESSAGE.UNAUTHORIZED);
};

/**
 * @description : 닉네임으로 해당 유저를 언팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.2,
 * @see None
 */
export const unfollowUser = async (nickname: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  const data = { nickname: nickname };

  if (accessToken) {
    const response = await axiosBase.delete("follow", {
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  throw new Error(ERROR_MESSAGE.UNAUTHORIZED);
};
