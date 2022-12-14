import React from "react";
import { View } from "react-native";
import { Button, Card } from "react-native-paper";

import styles from "../../styles/search.styles";

const SearchResult = ({ recipe }) => {
  return (
    <View>
      <Card style={styles.resultContainer}>
        <Card.Title
          title={recipe.hasOwnProperty("label") && recipe.label}
          subtitle={
            `Serves ${parseInt(recipe.yield)}, Calories: ${parseFloat(recipe.calories).toFixed()}`
          }
        />
        <Card.Cover source={{ uri: recipe.image }} />
        <Card.Actions>
          <Button onPress={() => {
            // TODO: Show recipe in browser
            console.log("TODO: Show recipe in browser");
          }}>View Recipe</Button>
          {/* TODO: Trigger snackbar on save */}
          <Button onPress={() => {
            // TODO: Save recipe to Pantry
            // addRecipe(recipe.label, recipe.url);
          }}>
            Save
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default SearchResult;
