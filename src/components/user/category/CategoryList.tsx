import React from "react";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { Category } from "../../../types/category";

type CategoryProps = {
  categoryList: Category[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * @description : 카테고리 리스트 컴포넌트
 *
 * @param categoryList : 카테고리 리스트 배열
 * @param selectedCategory : 현재 선택된 카테고리
 * @param setSelectedCategory : 현재 선택된 카테고리를 변경하는 함수
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.0.1, 카테고리 데이터 없을시 렌더링 안되도록 수정
 * @see None,
 */
const CategoryList = ({
  categoryList,
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) => {
  const categoryNameList =
    categoryList.length !== 0
      ? [
          "전체보기",
          ...Object.values(categoryList).map((item) => item.categoryName),
        ]
      : [];

  return (
    <CategoryContainer>
      {categoryNameList.map((item, index) => {
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

export default CategoryList;

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
