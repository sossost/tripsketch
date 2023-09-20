import { styled } from "styled-components/native";

interface PageLayoutProps {
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
  padding: 20px;
  padding-top: 50px;
  gap: 15px;
`;
