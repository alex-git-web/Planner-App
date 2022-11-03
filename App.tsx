import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux'
import Main from './Main';
import { store } from './redux/store';

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
