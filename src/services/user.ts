import axios from "axios";
import mockData from "../../data/mockdata.json";
import { axiosBase } from "../api/axios";

/** 유저 정보 get 요청하는 함수 (230728 updated) */
export const getCurrentUser = async (token: string | null) => {
  try {
    if (token) {
      const response = await axiosBase.get("/oauth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
    // 토큰이 없을 때 null 처리
    return null;
  } catch (error: any) {
    console.log("유저 정보 get 요청과 관련한 오류는...🤔", error);
  }
};

/** 유저 정보 patch 요청하는 함수 (230728 updated)
 * data = {nickname: "닉네임", profileImageUrl: "프로필 이미지 링크", introduction:"소개글"} 형식으로 넣어줘야함
 */
export const patchCurrentUser = async (token: string | null, data: any) => {
  try {
    if (token) {
      const response = await axiosBase.patch(
        "/oauth/user",
        {
          nickname: data.nickname,
          profileImageUrl: data.profileImageUrl,
          introduction: data.introduction,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } // 토큰이 없을 때 null 처리
    return null;
  } catch (error: any) {
    console.log("유저 정보 patch 요청과 관련한 오류는...🤔", error);
  }
};

export const getFollowerList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `/api/follow/followers?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowingList = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `/api/follow/followings?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserByNickname = async (nickname: string) => {
  try {
    const response = await axiosBase.get(
      `/api/user/nickname?nickname=${nickname}`
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const response = await axiosBase.get(`/api/user/email?email=${email}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};
