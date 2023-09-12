import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { axiosBase } from "./axios";
import { API_BASE_URL } from "@env";
import { User } from "../types/user";
import {
  getDataFromSecureStore,
  resetDataInSecureStore,
} from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { throwErrorMessage } from "../utils/getErrorMessage";

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
    throw new Error("로그인 해주시길 바랍니다.");
  } catch (error: unknown) {
    await resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
    await resetDataInSecureStore(STORE_KEY.REFRESH_TOKEN);
    throwErrorMessage(error, "로그인한 유저 정보 요청 에러는🤔");
  }
};

/** 유저 정보 SecureStore에서 불러오는 함수 */
export const getUserInfo = async () => {
  try {
    const userInfoJSON = await SecureStore.getItemAsync("userProfile");
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      console.log("SecureStore에 저장된 유저정보!", userInfo);
      return userInfo as User;
    } else {
      console.log("유저 정보가 없습니다..");
      return null;
    }
  } catch (error: unknown) {
    throwErrorMessage(error, "시큐어 스토어 유저정보 요청 에러는🤔");
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
    throwErrorMessage(error, "프로필 수정 요청 에러는🤔");
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
    throwErrorMessage(error, "팔로우리스트 요청 에러는🤔");
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
    throwErrorMessage(error, "팔로잉리스트 요청 에러는🤔");
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
    throwErrorMessage(error, "닉네임으로 유저 정보 요청 에러는🤔");
  }
};

/**
 * @description : 닉네임으로 해당 유저를 팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
 * @see None
 */
export const followUser = async (nickname: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");

  const data = { nickname: nickname };

  if (accessToken) {
    try {
      const response = await axiosBase.post("follow", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      throwErrorMessage(error, "유저 팔로우 요청 에러는🤔");
    }
  }

  throw new Error("로그인 해주시길 바랍니다.");
};

/**
 * @description : 닉네임으로 해당 유저를 언팔로우하는 함수
 * @author : 장윤수
 * @update : 2023-09-12, 장윤수, 에러 핸들링 추가
 * @version 1.01, 에러 핸들링 추가
 * @see None
 */
export const unfollowUser = async (nickname: string) => {
  const accessToken = await SecureStore.getItemAsync("accessToken");

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
      throwErrorMessage(error, "언팔로우 요청 에러는🤔");
    }
  }

  throw new Error("로그인 해주시길 바랍니다.");
};
