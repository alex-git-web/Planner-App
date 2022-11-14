import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View  } from "react-native";
import { useAppSelector } from "../../../../../redux/hooks";
import { getTodoListAsyncStorage } from "../../../others/asyncStorage";
import { TodoEventDataType, TodoItemType } from "../../../others/constants";
import TodoItem from "./components/TodoItem";

interface PageProps {}
let idx_todos_counter = 0

export const TodoListElement: React.FC<PageProps> = () => {
  const { curSelectedDate } = useAppSelector(state => state.homeScreen)
  const { isRenderTodoList } = useAppSelector(state => state.homeScreen)
  const [todoList, setTodoList] = useState<Array<TodoItemType>>([]);

  const renderItem = (todo:TodoItemType) => {
    return todo.event_data.map((event_data:TodoEventDataType) => {
      return <TodoItem 
        key={event_data.id}
        index={++idx_todos_counter}
        item_event_data={event_data} 
        todoListLenght={todoList.length} 
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
