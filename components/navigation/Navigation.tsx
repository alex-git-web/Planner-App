import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import HomeStackNavigator from './HomeStack';
import BottomTabs from './BottomTabs';

const Navigation = () => {
  return (
    <NavigationContainer>
       <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigation;
