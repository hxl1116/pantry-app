import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../scenes/home/HomeScreen";
import SearchScreen from "../scenes/search/SearchScreen";
import TranscribeScreen from "../scenes/transcribe/TranscribeScreen";
import Pantry from "../scenes/pantry/Pantry"
const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "PantryApp",
      }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
    />
    <Stack.Screen
      name="Transcribe"
      component={TranscribeScreen}
    />
    <Stack.Screen
      name="Pantry"
      component={Pantry}
    />
  </Stack.Navigator>
);

export default RootStack;
