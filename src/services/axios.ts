import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { API_BASE_URL } from "@env";
import {
  getDataFromSecureStore,
  setDataToSecureStore,
} from "../utils/secureStore";
import { STORE_KEY } from "../constants/store";
import { errorLoging } from "../utils/errorHandler";

/** axiosBase 인스턴스 생성 */
export const axiosBase = axios.create({
  baseURL: API_BASE_URL!,
  timeout: 10000, // 요청 대기 시간 10초로 설정
});

/** 액세스 토큰 가져오는 함수 */
const getAccessToken = async () => {
  return await getDataFromSecureStore(STORE_KEY.ACCESS_TOKEN);
};

/** 액세스 토큰 만료 여부 판단하는 함수 */
const isTokenExpired = async () => {
  const accessToken = await getAccessToken();
  if (accessToken !== null) {
    try {
      const decodedToken: JwtPayload = jwtDecode(accessToken);

      // 토큰이 유효하지 않거나 만료 시간 정보가 없는 경우 토큰 만료로 간주
      if (!decodedToken || typeof decodedToken.exp !== "number") {
        return true;
      }
      // 현재 시간을 초 단위로 변환
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

      if (currentTimestampInSeconds >= decodedToken.exp) {
      } else {
      }

      // 현재 시간과 토큰의 만료 시간 비교
      return currentTimestampInSeconds >= decodedToken.exp;
    } catch (error) {
      // 토큰 디코드 또는 처리 과정에서 에러가 발생한 경우 토큰 만료로 간주
      errorLoging(error, "토큰이 만료되었습니다.");
      return true;
    }
  } else {
    // accessToken이 null인 경우 토큰 만료로 간주
    return true;
  }
};

/** 리프레시 토큰으로 액세스 토큰 갱신하는 함수 */
export const tokenRefresh = async () => {
  try {
    // 기존의 리프레시 토큰으로 액세스 토큰 갱신 요청
    const refreshToken = await getDataFromSecureStore(STORE_KEY.REFRESH_TOKEN);
    const response = await axiosBase.post("oauth/kakao/refreshToken", {
      ourRefreshToken: refreshToken,
    });

    // 새로운 액세스 토큰 저장
    const newAccessToken = response.headers.accesstoken;
    await setDataToSecureStore(STORE_KEY.ACCESS_TOKEN, newAccessToken);

    // 새로운 리프레시 토큰 저장
    const newRefreshToken = response.headers.refreshtoken;
    await setDataToSecureStore(STORE_KEY.REFRESH_TOKEN, newRefreshToken);
  } catch (error) {
    errorLoging(error, "리프레시 토큰으로 액세스 토큰 갱신 에러는🤔");
  }
};

axiosBase.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 모든 응답 전에 실행되는 함수
axiosBase.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }

    return response; // 응답이 정상적으로 도착하면 해당 응답을 반환합니다.
  },
  async (error) => {
    // 응답 상태 코드가 401 (Unauthorized)인 경우
    if (error.response?.status === 401) {
      const isExpired = await isTokenExpired(); // 토큰이 만료되었는지 확인합니다.
      if (isExpired) await tokenRefresh(); // 토큰이 만료되었다면 토큰을 갱신합니다.

      const accessToken = await getAccessToken(); // 갱신된 토큰을 가져옵니다.

      // 에러가 발생한 요청의 헤더를 갱신된 토큰으로 업데이트합니다.
      error.config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config); // 갱신된 토큰으로 다시 요청을 보냅니다.
      return response; // 요청 재시도 결과를 반환합니다.
    }
    return Promise.reject(error); // 그 외의 에러는 해당 에러를 반환합니다.
  }
);

export default axiosBase;
