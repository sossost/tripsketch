import axios from "axios";
import { axiosBase } from "./axios";
import { API_BASE_URL } from "@env";
import { User } from "../types/user";
import {
  getDataFromSecureStore,
  resetDataInSecureStore,
} from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import {
  errorLoging,
  errorToastMessageInCatch,
  getErrorMessage,
} from "../utils/errorHandler";
import { errorToastMessage } from "../utils/toastMessage";

/**
 * @description : 로그인한 유저의 정보를 요청하는 함수
 * @author : 이수현
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
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
  } catch (error: unknown) {
    await resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
    await resetDataInSecureStore(STORE_KEY.REFRESH_TOKEN);
    errorToastMessageInCatch(error);
    errorLoging(error, "로그인한 유저 정보 요청 에러는🤔");
  }
};

/**
 * @description : 유저 정보 patch 요청하는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
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
    return;
  } catch (error: unknown) {
    errorLoging(error, "프로필 수정 요청 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저의 팔로우 리스트를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
 * @see None
 */
export const getFollowerList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `follow/user/followers?nickname=${nickname}`
    );
    return response.data;
  } catch (error: unknown) {
    errorToastMessageInCatch(error);
    errorLoging(error, "팔로우리스트 요청 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저의 팔로잉 리스트를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
 * @see None
 */
export const getFollowingList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `follow/user/followings?nickname=${nickname}`
    );
    return response.data;
  } catch (error: unknown) {
    errorToastMessageInCatch(error);
    errorLoging(error, "팔로잉리스트 요청 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저의 정보를 가져오는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
 * @see None
 */
export const getUserByNickname = async (nickname: string) => {
  try {
    const response = await axiosBase.get(`user/nickname?nickname=${nickname}`);
    return response.data;
  } catch (error: unknown) {
    errorToastMessageInCatch(error);
    errorLoging(error, "닉네임으로 유저 정보 요청 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저를 팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.1.1, 엑세스 토큰 가져오는 로직 수정
 * @see None
 */
export const followUser = async (nickname: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  if (accessToken) {
    try {
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
    } catch (error: unknown) {
      errorLoging(error, "유저 팔로우 요청 에러는🤔");
    }
  }

  throw new Error("로그인 해주시길 바랍니다.");
};

/**
 * @description : 닉네임으로 해당 유저를 언팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.1.1, 엑세스 토큰 가져오는 로직 수정
 * @see None
 */
export const unfollowUser = async (nickname: string) => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);

  const data = { nickname: nickname };

  if (accessToken) {
    try {
      const response = await axiosBase.delete("follow", {
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      errorLoging(error, "언팔로우 요청 에러는🤔");
    }
  }

  throw new Error("로그인 해주시길 바랍니다.");
};
