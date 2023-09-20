import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";

const Title = ({ title }: { title: string }) => {
  return <TitleText>{title}</TitleText>;
};

export default Title;

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${colors.mainFont};
`;
