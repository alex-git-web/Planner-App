import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View  } from "react-native";
import { animation_duration } from "../../../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setData } from "../../../../../redux/slices/homeScreenState";
import { getTodoListAsyncStorage, removeTodoAsyncStorage } from "../../../others/asyncStorage";
import { TodoEventDataType, TodoItemType } from "../../../others/constants";
import TodoItem from "./components/TodoItem";

interface PageProps {}
let idx_todos_counter = 0

export const TodoListElement: React.FC<PageProps> = () => {
  const dispatch = useAppDispatch()
  const { curSelectedDate } = useAppSelector(state => state.homeScreen)
  const { isRenderTodoList } = useAppSelector(state => state.homeScreen)
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([]);

  const deleteItem = async (todo:TodoItemType) => {
    const res:any = await removeTodoAsyncStorage(todo)
    if (res)
    {
      dispatch(setData({
        key: 'isRenderTodoList',
        value: !isRenderTodoList
      }))
    }
    // исчезновение
  } 

  const renderItem = (todo:TodoItemType) => {
    return todo.event_data.map((event_data:TodoEventDataType) => {
      return <TodoItem 
        key={event_data.id}
        index={++idx_todos_counter}
        item_event_date={todo.event_date} 
        item_event_data={event_data} 
        deleteItem={deleteItem} 
      />
    })
  }

  const getTodoListFromStorage = async () => {
    const items = await getTodoListAsyncStorage();
   
    setTodoList(items);
  };

  useEffect(() => {
    getTodoListFromStorage();
  }, [isRenderTodoList]);

  const todos = useMemo(() => {
    idx_todos_counter = 0
    return todoList.map((todo) => {
      if (todo.event_date === curSelectedDate)
      return renderItem(todo)
    })
  }, [curSelectedDate, todoList])
  
  return (
    <View style={styles.container}>
      { todos }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  }
});
