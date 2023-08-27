import { styled } from "styled-components/native";

type HeaderProps = {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
};

const Header = ({ left, center, right }: HeaderProps) => {
  return (
    <Layout>
      <LeftWrapper>{left}</LeftWrapper>
      <CenterWrapper>{center}</CenterWrapper>
      <RightWrapper>{right}</RightWrapper>
    </Layout>
  );
};

export default Header;

const Layout = styled.View`
  margin-top: 30px;
  height: 60px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const LeftWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const CenterWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const RightWrapper = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  min-width: 30px;
`;
