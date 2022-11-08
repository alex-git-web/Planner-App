import AsyncStorage from "@react-native-community/async-storage";
import { TodoItemType } from "./constants";

export const setTodoListAsyncStorage = async (todos:Array<TodoItemType>) => {
    try {
        await AsyncStorage.setItem('@todo_list', JSON.stringify(todos));
    } catch (error) {
        console.log("Async Storage: an error occurred while setting data: " , error)
    }
};

export const getTodoListAsyncStorage = async () => {
    try {
        const data = await AsyncStorage.getItem('@todo_list')
        if (data !== null) {
            return JSON.parse(data)
        }
    }
    catch (error) {
        console.warn("Async Storage: an error occurred while getting data: " , error)
        return null
    }
};

export const addTodoAsyncStorage = async (newTodo:TodoItemType) => {
    const todo_list = await getTodoListAsyncStorage()
    if (todo_list) {
        todo_list.push(newTodo)
        setTodoListAsyncStorage(todo_list)
    }
   
    // AsyncStorage.removeItem('@todo_list', (err) => {
    //     console.warn("Async Storage: an error occurred while removing data: " , err)
    //     return
    // })
}

export const removeTodoAsyncStorage = async () => {

}

export const clearAsyncStorage = async () => {

}