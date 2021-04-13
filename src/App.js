import React from 'react';
import {StyleSheet, View} from 'react-native';
import Amplify from 'aws-amplify';
import config from '../aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import Predictions, {
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';
import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_SESSION_TOKEN,
} from '@env';
import Home from './components/Home';
import Transcribe from './components/Transcribe';

global.Buffer = global.Buffer || require('buffer').Buffer;

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

Amplify.addPluggable(new AmazonAIPredictionsProvider());

function App() {
  return (
    <View style={styles.container}>
      <Home />
      <Transcribe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default withAuthenticator(App);
