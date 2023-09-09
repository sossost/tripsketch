/**
 * @설명 : 발리데이션 정규식 및 에러 메세지를 정의한 파일
 * @작성자 : Ynnsuis
 * @작성일 : 2023-09-10
 * @version 0.1, 초안 작성
 * @see None
 */

export const VALIDATION = {
  NICKNAME: /^[a-zA-Z0-9가-힣]{2,12}$/,
  INTRODUCTION: /^.{1,60}$/,
};

export const VALIDATION_ERROR_MESSAGE = {
  NICKNAME: "2~12자의 한글, 영문, 숫자만 사용 가능합니다.",
  INTRODUCTION: "60자 이내로 입력해주세요.",
};
