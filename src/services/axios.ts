import axios from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { errorLoging } from "@utils/errorHandler";
import {
  getAccessToken,
  getRefreshToken,
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@utils/token";

/** axiosBase 인스턴스 생성 */
export const axiosBase = axios.create({
  baseURL: "https://tripsketch.kro.kr/api/",
  timeout: 10000, // 요청 대기 시간 10초로 설정
});

axiosBase.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 대기열 배열
let refreshSubscribers: ((accessToken: string) => void)[] = [];
// 토큰 갱신 중인지 여부를 나타내는 변수
let isRefreshing = false;

// 응답 인터셉터: 모든 응답 전에 실행되는 함수
axiosBase.interceptors.response.use(
  (response) => {
    return response; // 응답이 정상적으로 도착하면 해당 응답을 반환합니다.
  },
  async (error) => {
    // 응답 상태 코드가 401 (Unauthorized)인 경우
    if (error.response?.status === 401) {
      console.log(error.response.config.url, "에서 401 에러 발생!");

      const accessToken =
        error.response.config.headers.Authorization.split(" ")[1];

      //토큰 만료 확인
      const isExipred = checkTokenExpired(accessToken);

      console.log("토큰만료여부" + isExipred, "리프레시중여부" + !isRefreshing);

      // 토큰이 만료되었고 토큰 갱신 중이 아니라면 토큰 갱신 로직 실행
      if (isExipred && !isRefreshing) {
        try {
          isRefreshing = true;
          console.log("토큰 갱신중...!");

          // 토큰 갱신 요청
          const newAccessToken = await tokenRefresh();
          console.log("새로운 토큰 수신 성공!");

          // 토큰 갱신에 성공했다면 헤더에 새로운 액세스 토큰을 추가
          axiosBase.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          // 현재 요청 재시도
          console.log("현재 요청 재시도!");
          const response = await axiosBase(error.config);
          console.log("현재 요청 재시도 성공!");

          // 대기열 요청 재시도
          refreshSubscribers.forEach((cb, index) => {
            console.log(index + 1 + "번째 대기열에 있는 요청 재시도!");
            cb(newAccessToken);
          });
          console.log("대기열의 모든 요청 재시도 성공!!");
          refreshSubscribers = [];

          return response;
        } catch (error) {
          errorLoging(error, "토큰 갱신 에러는🤔!!");
        } finally {
          isRefreshing = false;
          console.log("토큰 갱신 및 기존 요청 처리가 완료되었습니다.!!");
        }
      } else {
        console.log("현재 토큰 갱신 중이므로 대기열에 추가합니다");
        // 토큰 갱신 중이라면 401 에러난 요청들 대기열에 추가
        return new Promise((resolve) => {
          refreshSubscribers.push((newAccessToken) => {
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            resolve(axiosBase(error.config));
          });
        });
      }
    }
    return Promise.reject(error); // 그 외의 에러는 해당 에러를 반환합니다.
  }
);

export default axiosBase;

/** 액세스 토큰 만료 여부 판단하는 함수 */
const checkTokenExpired = (accessToken: string | null) => {
  if (accessToken !== null) {
    try {
      const decodedToken: JwtPayload = jwtDecode(accessToken);

      // 토큰이 유효하지 않거나 만료 시간 정보가 없는 경우 토큰 만료로 간주
      if (!decodedToken || typeof decodedToken.exp !== "number") {
        return false;
      }
      // 현재 시간을 초 단위로 변환
      const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

      // 현재 시간과 토큰의 만료 시간 비교
      return currentTimestampInSeconds >= decodedToken.exp;
    } catch (error) {
      errorLoging(error, "토큰 만료 여부 판단 에러는🤔");
      return false;
    }
  } else {
    return false;
  }
};

/** 리프레시 토큰으로 액세스 토큰 갱신하는 함수 */
const tokenRefresh = async () => {
  try {
    // 기존의 리프레시 토큰으로 액세스 토큰 갱신 요청

    const refreshToken = await getRefreshToken();
    console.log("갱신 요청한 리프레시토큰은", refreshToken);
    const response = await axiosBase.post("oauth/kakao/refresh-token", {
      ourRefreshToken: refreshToken,
    });

    console.log("토큰 리프레시 성공!");

    // 새로운 액세스 토큰 저장
    const newAccessToken = response.headers.accesstoken;
    await setAccessToken(newAccessToken);

    // 새로운 리프레시 토큰 저장
    const newRefreshToken = response.headers.refreshtoken;
    await setRefreshToken(newRefreshToken);

    console.log("새로발급받은 리프레시 :" + newRefreshToken);
    return newAccessToken;
  } catch (error) {
    errorLoging(error, "리프레시 토큰으로 액세스 토큰 갱신 에러는🤔");
    await resetAccessToken();
    await resetRefreshToken();
    throw error;
  }
};
