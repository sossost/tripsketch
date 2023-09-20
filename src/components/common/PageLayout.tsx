import { ViewProps } from "react-native";
import { styled } from "styled-components/native";

interface PageLayoutProps extends ViewProps {
  children: React.ReactNode;
}

const PageLayout = ({ children, ...props }: PageLayoutProps) => {
  return <ExplorePageLayout {...props}>{children}</ExplorePageLayout>;
};

export default PageLayout;

const ExplorePageLayout = styled.View`
  display: flex;
  flex: 1;
  background-color: #fff;
  padding-horizontal: 20px;
  padding-top: 50px;
  gap: 15px;
`;
