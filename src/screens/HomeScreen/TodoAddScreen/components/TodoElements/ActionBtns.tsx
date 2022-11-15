import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { colors } from "../../../../../../colors";
import { animation_duration, PAGE_HEIGHT } from "../../../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setData } from "../../../../../redux/slices/homeScreenState";
import { addTodoAsyncStorage } from "../../../others/asyncStorage";
import { todoCompleteStatus } from "../../../others/constants";
import { items_task_time } from "./others/constants";

interface PageProps {
  checkedDate:string,
  taskText:string,
  activeTaskTimeItemIdx:number
  activeNotificationTimeItemIdx:number
  activeNotificationRepeatStateItemIdx:number
}

export const ActionBtns: React.FC<PageProps> = ({
  checkedDate,
  taskText,
  activeTaskTimeItemIdx,
  activeNotificationTimeItemIdx,
  activeNotificationRepeatStateItemIdx
}) => {
  const { modal_add_todo:a_duration } = animation_duration
  const { isRenderTodoList } = useAppSelector(state => state.homeScreen)
  const dispatch = useAppDispatch()

  console.log()
  const cancel = () => {
    dispatch(setData({
      key: 'isOpenModal',
      value: false
    }))
    setTimeout(() => {
      dispatch(setData({
        key: 'isShowModal',
        value: false
      }))
    }, a_duration)
  }
  
  const add = () => {
    const date = new Date(checkedDate)
    const todo = { 
        event_date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        event_data: [
        {
            id: Date.now(), 
            title: taskText,
            direction: 'Don\'t forget to add a graph the...',
            eventTime: items_task_time[activeTaskTimeItemIdx],
            status: todoCompleteStatus.inProcess
        },
        ]
      }

      const res:any = addTodoAsyncStorage(todo)
      if (res) {
        dispatch(setData({
          key: 'isOpenModal',
          value: false
        }))

        setTimeout(() => {
          dispatch(setData({
            key: 'isRenderTodoList',
            value: !isRenderTodoList
          }))
        }, a_duration)
      }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancel_btn} onPress={() => cancel()}>
        <Text style={styles.cancel_btn_text}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.add_btn} onPress={() => add()}>
        <Text style={styles.add_btn_text}>Save task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    zIndex: 1,
    backgroundColor: colors.white,
    width: '100%',
    height: '10%',
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancel_btn: {
    width: '45%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancel_btn_text: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '600'
  },
  add_btn: {
    width: '45%',
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_btn_text: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '600'
  },
});