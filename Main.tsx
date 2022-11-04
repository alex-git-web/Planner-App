import React from 'react';
import Navigation from './components/navigation/Navigation';
import SplashScreen from './components/SplashScreen/SplashScreen';
import { useAppDispatch, useAppSelector } from './redux/hooks';

const Main = () => {
  const isSplashScreen = useAppSelector((state) => state.appConfigure.isSplashScreen)

  console.log(isSplashScreen)

  if (isSplashScreen) return <SplashScreen />
  else return <Navigation />
};

export default Main;
