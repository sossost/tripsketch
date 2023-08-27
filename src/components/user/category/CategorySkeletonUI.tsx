import { styled } from "styled-components/native";
import { CategoryContainer } from "./Category";
import { colors } from "../../../constants/color";

const CategorySkeletonUI = () => {
  return (
    <CategorySkeletonUIContainer>
      <CategorySkeletonUIButton width={70} />
      <CategorySkeletonUIButton width={60} />
      <CategorySkeletonUIButton width={90} />
    </CategorySkeletonUIContainer>
  );
};

export default CategorySkeletonUI;

const CategorySkeletonUIContainer = styled(CategoryContainer)``;

const CategorySkeletonUIButton = styled.View<{ width: number }>`
  width: ${(props) => props.width && props.width}px;
  height: 30px;
  background-color: ${colors.skeleton};
  border-radius: 25px;
`;
