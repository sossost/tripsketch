import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface LinkProps {
  page: string;
  text: string;
  styles?: StyleProp<ViewStyle>;
}

const Link: React.FC<LinkProps> = ({ page, text, styles }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(page as never);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default Link;
