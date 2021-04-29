import React, { useState } from "react";
import { withAuthenticator } from "aws-amplify-react-native";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";

import config from "../aws-exports";

import RootNavigator from "./navigations/RootNavigator";
import { PantryContext } from "./utils/pantry.utils";
import {getAllFoodItems} from "./utils/pantry.utils";

global.Buffer = global.Buffer || require("buffer").Buffer;

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  // TODO: Refactor to include categories
  const pantryHook = useState([]);

  return (
    <PantryContext.Provider value={pantryHook}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </PantryContext.Provider>
  );
};

export default withAuthenticator(App);
