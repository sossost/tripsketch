import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwtDecode, { JwtPayload } from "jwt-decode";

/** 액세스 토큰 가져오는 함수 */
const getAccessToken = async () => {
  return await SecureStore.getItemAsync("accessToken");
};

/** 액세스 토큰 만료 여부 판단하는 함수 */
const isTokenExpired = async (accessToken: string) => {
  try {
    const decodedToken: JwtPayload = jwtDecode(accessToken);
    if (!decodedToken || typeof decodedToken.exp !== "number") {
      // 토큰이 유효하지 않거나 만료 시간 정보가 없는 경우
      return true; // 토큰 만료로 간주
    }

    const currentTimestampInSeconds = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 변환
    return currentTimestampInSeconds >= decodedToken.exp; // 현재 시간과 토큰의 만료 시간 비교
  } catch (error) {
    return true; // 토큰 디코드 또는 처리 과정에서 에러가 발생한 경우 토큰 만료로 간주
  }
};

/** 액세스 토큰 만료 시 리프레시 토큰으로 갱신하는 함수 */
// const tokenRefresh =

/** axiosBase 인스턴스 생성 */
export const axiosBase = axios.create({
  baseURL: "https://port-0-tripsketch-kvmh2mljz6ccl7.sel4.cloudtype.app",
  timeout: 10000, // 요청 대기 시간 10초로 설정
});

// 요청 인터셉터: 모든 요청 전에 실행되는 함수
axiosBase.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    // 요청 헤더에 토큰과 컨텐트 타입을 설정합니다.
    config.headers["Content-Type"] = "application/json";
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    return config; // 수정된 설정(config)을 반환하여 요청을 계속 진행합니다.
  },
  (error) => {
    console.log(error);
    return Promise.reject(error); // 에러가 발생하면 해당 에러를 반환합니다.
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
    if (error.response?.status === 401) {
      // 응답 상태 코드가 401 (Unauthorized)인 경우
      if (isTokenExpired()) await tokenRefresh(); // 토큰이 만료되었다면 토큰을 갱신합니다.

      const accessToken = getAccessToken(); // 갱신된 토큰을 가져옵니다.

      // 에러가 발생한 요청의 헤더를 갱신된 토큰으로 업데이트합니다.
      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config); // 갱신된 토큰으로 다시 요청을 보냅니다.
      return response; // 요청 재시도 결과를 반환합니다.
    }
    return Promise.reject(error); // 그 외의 에러는 해당 에러를 반환합니다.
  }
);

export default axiosBase;
