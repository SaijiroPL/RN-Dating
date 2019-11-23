import React from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// from app
import { COLOR } from "app/src/constants";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
}

/**
 * 検索フォームバー
 * @author kotatanaka
 */
export const SearchFormBar: React.FC<Props> = (props: Props) => {
  const { value, setValue, onSearch } = props;
  return (
    <SearchBar
      placeholder="検索"
      round
      lightTheme
      searchIcon={
        <Ionicons name="ios-search" size={26} color={COLOR.textTintColor} />
      }
      clearIcon={
        <Ionicons name="ios-close" size={26} color={COLOR.textTintColor} />
      }
      onChangeText={value => {
        setValue(value);
      }}
      onEndEditing={onSearch}
      onClear={() => setValue("")}
      value={value}
      containerStyle={thisStyle.searchBar}
      inputContainerStyle={thisStyle.searchInput}
    />
  );
};

/** スタイリング */
const thisStyle = StyleSheet.create({
  searchBar: {
    backgroundColor: "white",
    shadowColor: "#ccc",
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  searchInput: {
    backgroundColor: "#eee"
  }
});
