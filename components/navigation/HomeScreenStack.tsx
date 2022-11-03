import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from '../HomeScreen/components/TodoList';
import TodoAddScreen from '../HomeScreen/TodoAddScreen/TodoAddScreen';
import { HomeStackNavigatorParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false
      })}
    >
        <HomeStack.Screen name="TodoList" component={TodoList} />
        <HomeStack.Screen name="TodoAdd" component={TodoAddScreen} />
    </HomeStack.Navigator>
  );
};
 
export default HomeScreenStack;
