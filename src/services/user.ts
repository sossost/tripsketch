import mockData from "../../data/mockdata.json";
import { axiosBase } from "../../api/axios";
import * as SecureStore from "expo-secure-store";

/** 유저 정보 get 요청하는 함수 (230728 updated) */
export const getCurrentUser = async () => {
  const accessToken = await SecureStore.getItemAsync("accessToken");
  console.log("                              ");
  console.log("user.ts 현재 액세스 토큰 ===> ", accessToken);
  try {
    if (accessToken) {
      const response = await axiosBase.get("/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("user.ts 요청한 유저 데이터 ===> ", response.data);
      return response.data;
    }
    // 토큰이 없을 때 null 처리
    console.log("토큰이 없음");
    return null;
  } catch (error: any) {
    console.log("유저 정보 get 요청과 관련한 오류는...🤔", error);
  }
};

/** 유저 정보 SecureStore에서 불러오는 함수 */
export const getUserInfo = async () => {
  try {
    const userInfoJSON = await SecureStore.getItemAsync("userProfile");
    if (userInfoJSON) {
      const userInfo = JSON.parse(userInfoJSON);
      console.log("SecureStore에 저장된 유저정보!", userInfo);
      return userInfo;
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

export const getFollowerList = async (userId: string, searchQuery: string) => {
  try {
    return Promise.resolve(mockData.users);
  } catch (error: any) {
    console.log(error);
  }
};

export const getFollowingList = async (userId: string, searchQuery: string) => {
  try {
    return Promise.resolve(mockData.users);
  } catch (error: any) {
    console.log(error);
  }
};
