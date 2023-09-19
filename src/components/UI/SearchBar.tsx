import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components/native";
import { colors } from "../../constants/color";
import { TouchableOpacity } from "react-native-gesture-handler";

interface SearchBarProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}

const SearchBar = ({ setSearchQuery, placeholder }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleClearInput = () => {
    setInput("");
    setSearchQuery("");
  };

  useEffect(() => {
    if (input.length > 0) setIsTyping(true);
    else setIsTyping(false);
  }, [input]);

  return (
    <Container>
      <SearchIcon source={require("../../assets/images/searchIcon.png")} />
      <SearchInput
        value={input}
        placeholder={placeholder}
        placeholderTextColor={colors.primary}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={() => setSearchQuery(input)}
      />
      {isTyping && (
        <TouchableOpacity onPress={handleClearInput}>
          <XIcon source={require("../../assets/images/xIcon.png")} />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default SearchBar;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  background-color: ${colors.palePastel};
  border-radius: 10px;
  padding-horizontal: 18px;
  padding-vertical: 9px;
  height: 50px;
`;

const SearchIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const XIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  border-width: 0;
  color: ${colors.secondary};
`;
