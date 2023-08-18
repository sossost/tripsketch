import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

type CategoryProps = {
  category: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Category = (props: CategoryProps) => {
  const { category, selectedCategory, setSelectedCategory } = props;

  return (
    <CategoryContainer>
      {category.map((item, index) => {
        const isClicked = item === selectedCategory;
        const clickedStyle = {
          backgroundColor: isClicked ? "#73BBFB" : "#ffffff",
          color: isClicked ? "#ffffff" : "#73BBFB",
        };

        return (
          <CategoryButton
            isClicked={isClicked}
            key={index}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.category, clickedStyle]}>{item}</Text>
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

export const CategoryButton = styled.TouchableOpacity<{ isClicked: boolean }>`
  padding: 6px 10px;
  border-width: 1px;
  border-color: #73bbfb;
  border-radius: 25px;
  background-color: ${(props) => (props.isClicked ? "#73BBFB" : "#ffffff")};
  color: ${(props) => (props.isClicked ? "#ffffff" : "#73BBFB")};
`;

const styles = StyleSheet.create({
  category: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
