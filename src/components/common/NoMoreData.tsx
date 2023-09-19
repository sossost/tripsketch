import { styled } from "styled-components/native";
import { colors } from "../../constants/color";

/**
 * @description : 더 이상 패치할 데이터 없을시 띄워주는 텍스트 컴포넌트
 *
 * @param message : 띄워줄 메시지 텍스트
 *
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.0.0,
 * @see None,
 */
const NoMoreData = ({ message }: { message: string }) => {
  return (
    <NoMoreDataContainer>
      <NoMoreDataText>{message}</NoMoreDataText>
    </NoMoreDataContainer>
  );
};

export default NoMoreData;

const NoMoreDataContainer = styled.View`
  align-items: center;
  margin-top: 20px;
`;

const NoMoreDataText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: ${colors.subFont};
`;
