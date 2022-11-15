export type TodoEventDataType = {
    id: number, 
    title: string,
    direction: string,
    eventTime: string,
    status: string
}

export type TodoItemType = {
    event_date: string,
    event_data: Array<TodoEventDataType>
} 
  
export const todoCompleteStatus = {
    done: '✓ Done',
    inProcess: 'In process'
}
  
// Define a type for the slice state
export interface ITodoListState {
    todoList: Array<TodoItemType>
}

export const todoList:Array<TodoItemType> = [
    {
        event_date: '2022-11-06',
        event_data: [
        {
            id: 1, 
            title: 'Learn English with teach',
            direction: '',
            eventTime: 'Every Tuesday',
            status: todoCompleteStatus.inProcess
        },
        ]
    },
    {
        event_date: '2022-11-15',
        event_data: [
        {
            id: 2, 
            title: 'Send rept to Kristen',
            direction: 'Don\'t forget to add a graph the...',
            eventTime: '10:30-11:00 PM',
            status: todoCompleteStatus.done
        },
        ] 
    },
    {
        event_date: '2022-11-25',
        event_data: [
        {
            id: 3, 
            title: 'Send rept to Kristen',
            direction: 'Don\'t forget to add a graph the...',
            eventTime: '10:30-11:00 PM',
            status: todoCompleteStatus.inProcess
        },
        {
            id: 4, 
            title: 'Send rept to Kristen',
            direction: 'Don\'t forget to add a graph the...',
            eventTime: '10:30-11:00 PM',
            status: todoCompleteStatus.inProcess
        }
        ],
    },
    {
        event_date: '2022-12-10',
        event_data: [
        {
            id: 5, 
            title: 'Send rept to Kristen',
            direction: 'Don\'t forget to add a graph the...',
            eventTime: '10:30-11:00 PM',
            status: todoCompleteStatus.inProcess
        },
        ]
    },
]
