import * as SecureStore from "expo-secure-store";
import { throwErrorMessage } from "./getErrorMessage";

/**
 * @description : 시큐어 스토어에 데이터를 저장하는 함수
 * @param key : 저장할 데이터의 키 string 타입
 * @param data : 저장할 데이터의 값 T 타입
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.1.0, data 타입 제네릭으로 변경 및 에러 핸들링 추가
 * @see None
 */
export const setDataToSecureStore = async <T>(key: string, data: T) => {
  try {
    const jsonData = JSON.stringify(data);
    await SecureStore.setItemAsync(key, jsonData);
  } catch (error: unknown) {
    throwErrorMessage(error, "SecureStore 데이터 저장 실패 오류는 🤔");
  }
};

/**
 * @description : 시큐어 스토어에서 데이터를 가져오는 함수
 * @param key : 저장할 데이터의 키 string 타입
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.1.0, 에러 핸들링 추가
 * @see None
 */
export const getDataFromSecureStore = async (key: string) => {
  try {
    const jsonData = await SecureStore.getItemAsync(key);
    return jsonData && JSON.parse(jsonData);
  } catch (error: unknown) {
    throwErrorMessage(error, "SecureStore 데이터 가져오기 실패 오류는 🤔");
  }
};

/**
 * @description : 시큐어 스토어에서 데이터를 삭제하는 함수
 * @param key : 삭제할 데이터의 키 string 타입
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0.0,
 * @see None
 */
export const resetDataInSecureStore = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error: unknown) {
    throwErrorMessage(error, "SecureStore 데이터 삭제 실패 오류는 🤔");
  }
};
