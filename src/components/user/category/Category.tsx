import React from "react";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";

type CategoryProps = {
  categoryList: { categoryName: string; postsLenght: number }[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Category = ({
  categoryList,
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) => {
  const categoryNameList = Object.values(categoryList).map(
    (item) => item.categoryName
  );

  return (
    <CategoryContainer>
      {["전체보기", ...categoryNameList].map((item, index) => {
        const isClicked = item === selectedCategory;

        return (
          <CategoryButton
            isClicked={isClicked}
            key={index}
            onPress={() => setSelectedCategory(item)}
          >
            <CategoryText isClicked={isClicked}>{item}</CategoryText>
          </CategoryButton>
        );
      })}
    </CategoryContainer>
  );
};

export default Category;

export const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;

const CategoryButton = styled.TouchableOpacity<{ isClicked: boolean }>`
  padding: 6px 10px;
  border-width: 1px;
  border-color: #73bbfb;
  border-radius: 25px;
  background-color: ${({ isClicked }) =>
    isClicked ? colors.primary : colors.white};
  color: ${({ isClicked }) => (isClicked ? colors.white : colors.primary)};
`;

const CategoryText = styled.Text<{ isClicked: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${({ isClicked }) => (isClicked ? colors.white : colors.primary)};
`;
