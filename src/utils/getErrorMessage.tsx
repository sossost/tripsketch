type ErrorWithMessage = {
  message: string;
};

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return typeof error === "object" && error !== null && "message" in error;
}

/**
 * @description : 에러를 받아서 메세지를 추출하는 함수
 * @param error : 에러 unknown 타입
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0,
 * @see None
 */
export function getErrorMessage(error: unknown) {
  if (isErrorWithMessage(error)) return error.message;
  return String(error);
}

/**
 * @description : 에러를 받아서 메세지를 추출하여 던지는 함수
 * @param error : 에러 unknown 타입
 * @param message : 콘솔로그에 띄울 메세지 앞부분
 * @author : 장윤수
 * @update : 2023-09-12,
 * @version 1.0,
 * @see None
 */
export function throwErrorMessage(error: unknown, message: string) {
  const errorMessage = getErrorMessage(error);
  console.log(message, errorMessage);
  throw new Error(errorMessage);
}
