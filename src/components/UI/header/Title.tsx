import { styled } from "styled-components/native";

const Title = ({ title }: { title: string }) => {
  return <TitleText>{title}</TitleText>;
};

export default Title;

const TitleText = styled.Text`
  font-size: 18px;
`;
