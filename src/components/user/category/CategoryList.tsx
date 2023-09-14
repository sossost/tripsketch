import React from "react";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { Category } from "../../../types/category";
import { useGetCategoriesByNickname } from "../../../hooks/useCategoryQuery";
import { useRecoilState } from "recoil";
import { categoryState } from "../../../store/categoryAtom";

/**
 * @description : 카테고리 리스트 컴포넌트
 *
 * @author : 장윤수
 * @update : 2023-09-13,
 * @version 1.1.1, 유저 페이지 컴포넌트 카테고리 로직 분리
 * @see None,
 */
const CategoryList = ({ nickname }: { nickname: string }) => {
  // 현재 선택된 카테고리를 관리하는 상태
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  // 닉네임을 통해 해당 유저의 카테고리를 가져옴
  const { data: categoryList } = useGetCategoriesByNickname(nickname);

  // 카테고리 리스트를 가져와서 카테고리 이름만 뽑아서 배열로 만듦
  const categoryNameList =
    categoryList && categoryList.length > 0
      ? [
          "전체보기",
          ...Object.values(categoryList).map((item) => item.categoryName),
        ]
      : [];

  return (
    <CategoryContainer>
      {categoryNameList.map((item, index) => {
        // 현재 클릭된 카테고리인지 확인
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
