import { styled } from "styled-components/native";

const Logo = () => {
  return <LogoImage source={require("@assets/logo.png")} />;
};

export default Logo;

const LogoImage = styled.Image`
  width: 150px;
  height: 30px;
  object-fit: contain;
`;
