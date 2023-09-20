import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorLoging } from "./errorHandler";

/**
 * @description : Aysnc Storage 에 데이터를 저장하는 함수
 *
 * @param key : 저장할 데이터의 키 string 타입
 * @param data : 저장할 데이터의 값 T 타입
 *
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.0.0,
 * @see None
 */
export const saveDataToAsyncStorage = async <T>(key: string, data: T) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error: unknown) {
    errorLoging(error, "AsyncStorage 데이터 저장 실패 오류는 🤔");
  }
};

/**
 * @description : Aysnc Storage 에서 데이터를 가져오는 함수
 *
 * @param key : 가져올 데이터의 키 string 타입
 *
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.0.0,
 * @see None
 */
export const getDataFromAsyncStorage = async (key: string) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData && JSON.parse(jsonData);
  } catch (error: unknown) {
    errorLoging(error, "AsyncStorage 데이터 가져오기 실패 오류는 🤔");
  }
};

/**
 * @description : Aysnc Storage 에서 데이터를 삭제하는 함수
 *
 * @param key : 삭제할 데이터의 키 string 타입
 *
 * @author : 장윤수
 * @update : 2023-09-20,
 * @version 1.0.0,
 * @see None
 */
export const resetDataInAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error: unknown) {
    errorLoging(error, "AsyncStorage 데이터 삭제 실패 오류는 🤔");
  }
};
