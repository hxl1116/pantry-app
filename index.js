/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import App from "./src/App";
import { name as appName } from "./app.json";
import {GQL_URL} from '@env';

const apolloClient = new ApolloClient({
  uri: GQL_URL,
  cache: new InMemoryCache(),
});

const AppRoot = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => AppRoot);
