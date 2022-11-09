import React from 'react';
import { setTodoListAsyncStorage } from './screens/HomeScreen/others/asyncStorage';
import { todoList } from './screens/HomeScreen/others/constants';
import Navigation from './navigation/Navigation';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import { useAppSelector } from './redux/hooks';

const Main = () => {
  const isSplashScreen = useAppSelector((state) => state.appConfigure.isSplashScreen)

  if (isSplashScreen) return <SplashScreen />
  else {
    // set todo list in Async Storage
    setTodoListAsyncStorage(todoList)
    return <Navigation />
  }
};

export default Main;
