import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import SplashScreen from './components/SplashScreen/SplashScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SplashScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
