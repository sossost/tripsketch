export const useCreateTime = (createDate: string) => {
  const dateString = createDate;
  const date = new Date(dateString);

  // 한국 시간대로 조정 (UTC+9).
  date.setHours(date.getHours() + 9);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const koreaTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return koreaTime;
};
