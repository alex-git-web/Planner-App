import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux'
import Main from './src/Main';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store} >
      <Main />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
