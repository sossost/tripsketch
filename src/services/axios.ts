import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { API_BASE_URL } from "@env";

/** axiosBase 인스턴스 생성 */
export const axiosBase = axios.create({
  baseURL: API_BASE_URL!,
  timeout: 10000, // 요청 대기 시간 10초로 설정
});

/** 액세스 토큰 가져오는 함수 */
const getAccessToken = async () => {
  return await SecureStore.getItemAsync("accessToken");
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
        console.log("액세스 토큰이 만료되었습니다!");
      } else {
        console.log("액세스 토큰이 유효합니다");
      }

      // 현재 시간과 토큰의 만료 시간 비교
      return currentTimestampInSeconds >= decodedToken.exp;
    } catch (error) {
      // 토큰 디코드 또는 처리 과정에서 에러가 발생한 경우 토큰 만료로 간주
      return true;
    }
  } else {
    // accessToken이 null인 경우 토큰 만료로 간주
    return true;
  }
};

/** 리프레시 토큰으로 액세스 토큰 갱신하는 함수 */
export const tokenRefresh = async () => {
  // 리프레시 토큰으로 액세스 토큰 갱신 요청
  try {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");

    if (refreshToken) {
      const response = await axiosBase.post("oauth/kakao/refreshToken", {
        ourRefreshToken: refreshToken,
      });

      // 새로운 액세스 토큰 저장
      const newAccessToken = response.headers.accesstoken;
      await SecureStore.setItemAsync("accessToken", newAccessToken);
    } else {
      const navigation = useNavigation();
      console.log("리프레시 토큰이 없습니다!!");
      // 리프레시 토큰이 만료된 경우 로그인 화면으로 이동
      navigation.navigate as (route: string) => void;
      ("Login");
    }
  } catch (error) {
    console.log("리프레시 토큰 갱신 요청 중 발생한 에러는...🤔", error);
  }
};

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
      console.log("401에러!!!");
      if (await isTokenExpired()) await tokenRefresh(); // 토큰이 만료되었다면 토큰을 갱신합니다.

      const accessToken = await getAccessToken(); // 갱신된 토큰을 가져옵니다.
      console.log("갱신된 accessToken은...", accessToken);

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
