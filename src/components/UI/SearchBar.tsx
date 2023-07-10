import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  style?: StyleProp<ViewStyle>;
  fontSize?: number;
};

const SearchBar = (props: SearchBarProps) => {
  const { searchQuery, setSearchQuery, style, fontSize } = props;
  const inputStyle = {
    fontSize: fontSize ? fontSize : 16,
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../assets/images/searchIcon.svg")}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },

  searchIcon: {
    width: 20,
    height: 20,
  },

  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    outlineStyle: "none",
  },
});
