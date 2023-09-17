import { ERROR_MESSAGE } from "../constants/message";
import { NotificationResponse } from "../types/Notification";
import { errorLoging } from "../utils/errorHandler";
import axiosBase from "./axios";

/**
 * @description : 알림 리스트를 요청하는 함수
 *
 * @param page : 현재 알림 페이지
 * @param size : 페이지당 알림 수
 *
 * @author : 장윤수
 * @update : 2023-09-17,
 * @version 1.1.0, 에러 던지기 추가
 * @see None,
 */
export const getNotifications = async (page: number, size: number) => {
  try {
    const response = await axiosBase.get<NotificationResponse>(
      `notifications?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error: unknown) {
    errorLoging(error, "알림 리스트 요청 에러는🤔");
    throw new Error(ERROR_MESSAGE.GET_NOTIFICATIONS);
  }
};
