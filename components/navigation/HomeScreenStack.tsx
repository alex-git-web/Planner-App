import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoListScreen from '../HomeScreen/TodoListScreen/TodoListScreen';
import TodoAddScreen from '../HomeScreen/TodoAddScreen/TodoAddScreen';
import { HomeStackNavigatorParamList } from './types';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
        <HomeStack.Screen name="TodoList" component={TodoListScreen} />
        <HomeStack.Screen name="TodoAdd" component={TodoAddScreen} />
    </HomeStack.Navigator>
  );
};
 
export default HomeScreenStack;
