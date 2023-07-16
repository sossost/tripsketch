import React from "react";
import styled, { css } from "styled-components/native";
import { TextInput, Image } from "react-native";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  style?: any;
  fontSize?: number;
  placeholder: string;
};

const SearchBar = (props: SearchBarProps) => {
  const { searchQuery, setSearchQuery, style, fontSize, placeholder } = props;

  return (
    <Container style={style}>
      <SearchIcon source={require("../../assets/images/searchIcon.png")} />
      <SearchInput
        fontSize={fontSize ? fontSize : 18}
        value={searchQuery}
        placeholder={placeholder}
        placeholderTextColor="#bbb"
        onChangeText={(text) => setSearchQuery(text)}
      />
    </Container>
  );
};

export default SearchBar;

const Container = styled.View<{ style: any }>`
  flex-direction: row;
  align-items: center;
  gap: 10px;
  border-width: 1px;
  border-color: #d9d9d9;
  border-radius: 10px;
  padding-horizontal: 14px;
  padding-vertical: 9px;
  ${(props) =>
    props.style &&
    css`
      ${props.style}
    `}
`;

const SearchIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const SearchInput = styled(TextInput)<{ fontSize: number }>`
  flex: 1;
  font-size: ${(props) => props.fontSize}px;
  border-width: 0;
`;
