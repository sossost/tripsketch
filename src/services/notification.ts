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
 * @update : 2023-09-12,
 * @version 1.0.0, 기능 구현
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
  }
};
