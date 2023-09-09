/**
 * @설명 : 발리데이션 체크용 유틸 함수
 * @작성자 : 장윤수
 * @작성일 : 2023-09-10
 * @version 1.0, 발리데이션 체크용 유틸 함수 작성
 * @see None
 */

interface ValidationCheckProps {
  value: string;
  regex: RegExp;
}

const validationCheck = ({ value, regex }: ValidationCheckProps) => {
  return regex.test(value);
};

export default validationCheck;
