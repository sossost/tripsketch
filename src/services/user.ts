import axios from "axios";
import { axiosBase } from "./axios";
import { API_BASE_URL } from "@env";
import { errorLoging } from "../utils/errorHandler";
import { ERROR_MESSAGE } from "../constants/message";
import { getAccessToken, getPushToken } from "@utils/token";
import { getRequest } from "./utils/request";

/**
 * @description : 카카오 로그인 요청하는 함수
 * @author : 장윤수
 * @update : 2023-09-22,
 * @version 1.0.1, 토큰 관련 함수 변경
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
  const accessToken = await getAccessToken();
  const pushToken = await getPushToken();

  if (accessToken) {
    return await getRequest(`user?token=${pushToken}`, {
      Authorization: `Bearer ${accessToken}`,
    });
  } else {
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
  const accessToken = await getAccessToken();

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
 * @description : 닉네임으로 해당 유저를 팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-16,  try-catch -> 에러바운더리로 변경
 * @version 1.1.1,
 * @see None
 */
export const followUser = async (nickname: string) => {
  const accessToken = await getAccessToken();

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
  const accessToken = await getAccessToken();

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
