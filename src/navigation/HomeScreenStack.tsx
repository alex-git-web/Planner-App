import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from './types';
import TodoListScreen from '../screens/HomeScreen/TodoListScreen/TodoListScreen';
import { TodoAddScreen } from '../screens/HomeScreen/TodoAddScreen/TodoAddScreen';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
      })}
    >
        <HomeStack.Screen name="TodoList" component={TodoListScreen} />
    </HomeStack.Navigator>
  );
};
 
export default HomeScreenStack;