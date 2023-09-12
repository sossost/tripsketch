import { useEffect, useState } from "react";

/**
 * @description : 시간을 받아서 현재 시간과 비교하여 시간차를 표시해주는 커스텀 훅
 *
 * @param date : 날짜 문자열
 *
 * @author : 김서연
 * @update : 2023-09-12,
 * @version 1.1.0, 1분마다 업데이트 되도록 수정
 * @see None,
 */
const useTimeAgo = (date: string) => {
  const [timeAgo, setTimeAgo] = useState("");

  const updateRelativeTime = () => {
    const today = new Date();
    const notificationDate = new Date(date);
    const diffTime = today.getTime() - notificationDate.getTime();
    const diffInSeconds = Math.floor(diffTime / 1000);

    if (diffInSeconds < 60) {
      setTimeAgo(`${diffInSeconds}초 전`);
    } else if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      setTimeAgo(`${diffInMinutes}분 전`);
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      setTimeAgo(`${diffInHours}시간 전`);
    } else {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      setTimeAgo(`${diffInDays}일 전`);
    }
  };

  useEffect(() => {
    updateRelativeTime();

    // 초기 렌더링 이후에 1분마다 업데이트
    const intervalId = setInterval(updateRelativeTime, 60000);

    // 컴포넌트 언마운트 시 clearInterval 호출
    return () => clearInterval(intervalId);
  }, [date]);

  return timeAgo;
};

export default useTimeAgo;
