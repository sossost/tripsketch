import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

type CategoryProps = {
  category: string[];
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const Category = (props: CategoryProps) => {
  const { category, selectedCategory, setSelectedCategory } = props;

  return (
    <View style={styles.container}>
      {category.map((item, index) => {
        const isClicked = item === selectedCategory;
        const clickedStyle = {
          backgroundColor: isClicked ? "#73BBFB" : "#ffffff",
          color: isClicked ? "#ffffff" : "#73BBFB",
        };

        return (
          <TouchableOpacity
            key={index}
            style={[styles.categoryWrapper, clickedStyle]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text style={[styles.category, clickedStyle]}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  categoryWrapper: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#73BBFB",
    borderRadius: 25,
  },

  category: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
