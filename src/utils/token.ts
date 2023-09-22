import { STORE_KEY } from "@constants/store";
import {
  getDataFromSecureStore,
  resetDataInSecureStore,
  setDataToSecureStore,
} from "./secureStore";

// 엑세스 토큰 관련 함수

export const getAccessToken = async () => {
  const accessToken = await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
  return accessToken;
};

export const setAccessToken = async (accessToken: string) => {
  await setDataToSecureStore(STORE_KEY.ACCESS_TOKEN, accessToken);
};

export const resetAccessToken = async () => {
  await resetDataInSecureStore(STORE_KEY.ACCESS_TOKEN);
};

// 리프레시 토큰 관련 함수

export const getRefreshToken = async () => {
  const refreshToken = await getDataFromSecureStore(STORE_KEY.REFRESH_TOKEN);
  return refreshToken;
};

export const setRefreshToken = async (refreshToken: string) => {
  await setDataToSecureStore(STORE_KEY.REFRESH_TOKEN, refreshToken);
};

export const resetRefreshToken = async () => {
  await resetDataInSecureStore(STORE_KEY.REFRESH_TOKEN);
};

// 푸시 토큰 관련 함수

export const getPushToken = async () => {
  const pushToken = await getDataFromSecureStore(STORE_KEY.PUSH_TOKEN);
  return pushToken;
};

export const setPushToken = async (pushToken: string) => {
  await setDataToSecureStore(STORE_KEY.PUSH_TOKEN, pushToken);
};

export const resetPushToken = async () => {
  await resetDataInSecureStore(STORE_KEY.PUSH_TOKEN);
};
