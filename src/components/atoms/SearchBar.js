import React from "react";
import { Searchbar } from "react-native-paper";

import styles from "../../styles/search.styles";
import { auth } from "../../utils/search.utils";

const SearchBar = ({ query, setQuery, loadQuery }) => {
  const handleQuery = () => {
    loadQuery({
      variables: {
        appId: auth.appId,
        appKey: auth.appKey,
        q: query,
      },
      displayName: "RecipeQuery",
    });
  };

  return (
    <Searchbar
      style={styles.searchbar}
      placeholder="Search"
      value={query}
      onIconPress={() => handleQuery()}
      onChangeText={text => setQuery(text)}
    />
  );
};

export default SearchBar;
