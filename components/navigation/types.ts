import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type HomeStackNavigatorParamList = {
  TodoList: undefined;
  TodoAdd: undefined;
};

// export type HomeScreenNavigationProp = NativeStackNavigationProp<
//   HomeStackNavigatorParamList,
//   'TodoAdd'
// >;

export type BottomTabNavigatorParamList = {
  Files: undefined;
  Home: HomeStackNavigatorParamList;
  Settings: undefined;
};