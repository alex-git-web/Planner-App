import AsyncStorage from "@react-native-community/async-storage";
import { TodoEventDataType, TodoItemType } from "./constants";

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

export const addTodoAsyncStorage = async (newTodo:TodoItemType):Promise<boolean> => {
    const todo_list:Array<TodoItemType> = await getTodoListAsyncStorage()
    if (todo_list) {
        // Find equivalent 'event_date'
        const idx = todo_list.findIndex((todo:TodoItemType, index:number) => 
        { 
            return todo.event_date == newTodo.event_date
        })
        if (idx != -1) {
            todo_list[idx].event_data.push(newTodo.event_data[0])
            setTodoListAsyncStorage(todo_list)
            return true
        }
        // Add new 'event_date'
        todo_list.push(newTodo)
        setTodoListAsyncStorage(todo_list)
        return true
    }
    return false
}

export const removeTodoAsyncStorage = async (todo:TodoItemType):Promise<boolean> => {
    const todo_list:Array<TodoItemType> = await getTodoListAsyncStorage()
    if (todo_list) {
        // Get count items for selected 'event_date'
        const idx = todo_list.findIndex((item:TodoItemType) => {
            return item.event_date === todo.event_date
        })
        if (idx != -1) {
            const count_items = todo_list[idx].event_data.length
            if (count_items === 1) { // if items for current 'event_date' == 1
                todo_list.splice(idx, 1)
                setTodoListAsyncStorage(todo_list)
                return true
            }
            else { // if items for current 'event_date' > 1
                const idx_todo = todo_list[idx].event_data.findIndex((item:TodoEventDataType) => {
                    return item.id == todo.event_data[0].id
                })
                todo_list[idx].event_data.splice(idx_todo, 1)
                setTodoListAsyncStorage(todo_list)
                return true
            }
        } 
        else return false
    }
    else return false
}

export const clearAsyncStorage = async () => {

}