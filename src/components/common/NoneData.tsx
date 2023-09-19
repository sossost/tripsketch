import { colors } from "../../constants/color";
import { styled } from "styled-components/native";

/**
 * @description : 데이터 없을시 띄워주는 텍스트 컴포넌트
 *
 * @param message : 띄워줄 메시지 텍스트
 *
 * @author : 장윤수
 * @update : 2023-09-19,
 * @version 1.0.1, 스타일 변경
 * @see None,
 */
const NoneData = ({ message }: { message: string }) => {
  return (
    <NoneDataContainer>
      <NoneDataText>{message}</NoneDataText>
    </NoneDataContainer>
  );
};

export default NoneData;

const NoneDataContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const NoneDataText = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.mainFont};
  text-align-vertical: bottom;
`;
