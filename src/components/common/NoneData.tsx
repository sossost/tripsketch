import { colors } from "../../constants/color";
import { styled } from "styled-components/native";

interface NoneDataProps {
  message: string;
  onPress?: () => void;
}

/**
 * @description : 데이터 없을시 띄워주는 텍스트 컴포넌트
 *
 * @param message : 띄워줄 메시지 텍스트
 *
 * @author : 장윤수
 * @update : 2023-09-22,
 * @version 1.1.0, props onPress 추가
 * @see None,
 */
const NoneData = ({ message, onPress }: NoneDataProps) => {
  return (
    <NoneDataContainer activeOpacity={1} onPress={onPress}>
      <NoneDataText>{message}</NoneDataText>
    </NoneDataContainer>
  );
};

export default NoneData;

const NoneDataContainer = styled.TouchableOpacity`
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
