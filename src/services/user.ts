import axios from "axios";
import { axiosBase } from "./axios";
import { API_BASE_URL } from "@env";
import * as SecureStore from "expo-secure-store";
import { User } from "../types/user";
import { getDataFromSecureStore } from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";

/** 유저 정보 get 요청하는 함수 (230728 updated) */
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
    // 토큰이 없을 때 null 처리
    console.log("토큰이 없음");
    return null;
  } catch (error: any) {
    console.log("유저 정보 get 요청과 관련한 오류는...🤔", error);
    return null;
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
  } catch (error) {
    console.error(
      "SecureStore에 저장된 유저 정보를 가져오면서 발생한 에러는...🤔",
      error
    );
    return null;
  }
};

/** 유저 정보 patch 요청하는 함수 (230728 updated)
 * data = {nickname: "닉네임", profileImageUrl: "프로필 이미지 링크", introduction:"소개글"} 형식으로 넣어줘야함
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
      console.log("유저 정보 patch 요청 성공!", response.data);
      return response.data;
    }
    return;
  } catch (error: any) {
    console.log(
      "유저 정보 patch 요청과 관련한 오류는...🤔",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getFollowerList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `follow/user/followers?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowingList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `follow/user/followings?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserByNickname = async (nickname: string) => {
  try {
    const response = await axiosBase.get(`user/nickname?nickname=${nickname}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axiosBase.get(`user/email?email=${email}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

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
    } catch (error: any) {
      console.log(error.response);
    }
  }

  return;
};

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
    } catch (error: any) {
      console.log(error);
    }
  }

  return;
};
