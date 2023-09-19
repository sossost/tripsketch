import React, { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import { colors } from "../../../constants/color";
import { useGetCategoriesByNickname } from "../../../hooks/useCategoryQuery";
import { useRecoilState } from "recoil";
import { categoryState } from "../../../store/categoryAtom";

/**
 * @description : 카테고리 리스트 컴포넌트
 *
 * @author : 장윤수
 * @update : 2023-09-18,
 * @version 1.2.1, 카테고리 횡스크롤 및, 선택시 선택된 카테고리 배열 맨앞으로 추가
 * @see None,
 */
const CategoryList = ({ nickname }: { nickname: string }) => {
  // 닉네임을 통해 해당 유저의 카테고리를 가져옴
  const { data: initialCategoryList } = useGetCategoriesByNickname(nickname);

  // 카테고리 리스트를 가져와서 카테고리 이름만 뽑아서 배열로 만듦
  const categoryNameList = initialCategoryList
    ? [
        "전체보기",
        ...Object.values(initialCategoryList).map((item) => item.categoryName),
      ]
    : [];

  // 카테고리 리스트를 관리하는 상태
  const [categoryList, setCategoryList] = useState<string[]>(categoryNameList);

  // 현재 선택된 카테고리를 관리하는 상태
  const [selectedCategory, setSelectedCategory] = useRecoilState(categoryState);

  // 선택된 카테고리가 바뀔때마다 카테고리 리스트를 업데이트
  useEffect(() => {
    const newCategoryList = [...categoryNameList].filter(
      (category) => category !== selectedCategory
    );
    const selectedCategoryList = [selectedCategory, ...newCategoryList];

    setCategoryList(selectedCategoryList);
  }, [selectedCategory]);

  return (
    <CategoryContainer horizontal={true} showsHorizontalScrollIndicator={false}>
      {categoryList.map((item, index) => {
        // 현재 클릭된 카테고리인지 확인
        const isClicked = item === selectedCategory;

        if (categoryList.length === 1) return null;

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

export const CategoryContainer = styled.ScrollView`
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
  margin-right: 10px;
`;

const CategoryText = styled.Text<{ isClicked: boolean }>`
  font-size: 13px;
  font-weight: bold;
  color: ${({ isClicked }) => (isClicked ? colors.white : colors.primary)};
`;
