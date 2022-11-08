import React from 'react';
import { setTodoListAsyncStorage } from './components/HomeScreen/others/asyncStorage';
import { todoList } from './components/HomeScreen/others/constants';
import Navigation from './components/navigation/Navigation';
import SplashScreen from './components/SplashScreen/SplashScreen';
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
