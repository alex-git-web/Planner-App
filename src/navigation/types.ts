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
