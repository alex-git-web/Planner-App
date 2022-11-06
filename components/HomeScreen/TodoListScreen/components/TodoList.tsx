import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { colors } from "../../../../colors";
import { useAppSelector } from "../../../../redux/hooks";
import {todoList } from "../../../SplashScreen/others/constants";
import TodoItem from "./TodoItem";

interface PageProps {}

const TodoList: React.FC<PageProps> = () => {
  const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)

  const renderItem = (data:any) => {
    return <TodoItem 
      index={data.index}  
      item={data.item} 
    />
  }
  
  if (!isMainAppPartLoaded) return null

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>Priority Tasks</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={todoList}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '55%',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  caption: {
    fontSize: 20, 
    color: colors.black,
    fontWeight: '700',
    marginBottom: 25
  }
});

export default TodoList;