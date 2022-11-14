
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { colors } from "../../../../../../colors";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { actionTypes, setData } from "../../../../../redux/slices/homeScreenState";
import { getTodoListAsyncStorage } from "../../../others/asyncStorage";
import { TodoItemType } from "../../../others/constants";
import { CustomHeader } from "./components/customHeader";
import { DayComponent } from "./components/dayComponet";
import { monthNames } from "./others/configure";
import { getCurrentDate, getDayName } from "./others/functions";

interface PageProps {
  setIsShowSelectModal: any
}

type DayDataType = {
  monthName: string, 
  dayName: string
  dayNumber: number, 
  year: number
}

const CalendarElement: React.FC<PageProps> = ({
  setIsShowSelectModal
}) => {
  const dispatch = useAppDispatch()
  const { curSelectedDate, curSelectedMonth } = useAppSelector(state => state.homeScreen)
  const [todoList, setTodoList] = useState<Array<TodoItemType>>();

  const marks = useMemo(() => {
    const c_s_d = curSelectedDate.split('-')
    const todo_list = todoList?.filter(todo => { // => todos of current selected year and month
    if (
      (todo.event_date.split('-')[0] === c_s_d[0]) // year
        && (todo.event_date.split('-')[1] === (c_s_d[1])) // month
      ) return todo
    })
    return todo_list?.map(todo => {
      // returning multiple dots may be implemented in the future
      // now - one dot
      return { [todo.event_date]: { marked: true, dotColor: colors.blue } }
    })
  }, [todoList, curSelectedMonth])

  const onDayPress = useCallback((day:any) => {
    dispatch(setData({
      key: actionTypes.curSelectedDate, 
      value: day.dateString
    }))
  }, []);

  const getNewSelectedDate = useCallback(
    (date:any, shouldAdd:boolean) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(new Date().setMonth(month));
      const newSelected = new Date(newDate.setDate(1));

      return `${newSelected.getFullYear()}-${newSelected.getMonth() + 1}`;
    },
    [curSelectedDate]
  );

  const onPressArrowLeft = useCallback((subtract:any, month: any) => {
    const newDate = getNewSelectedDate(month, false);
    dispatch(setData({
      key: 'curSelectedMonth',
      value: newDate
    }))
    subtract()
  }, []);

  const onPressArrowRight = useCallback((add:any, month: any) => {
    const newDate = getNewSelectedDate(month, true);
    dispatch(setData({
      key: 'curSelectedMonth',
      value: newDate
    }))
    add()
  }, []);

  const getTodoListFromStorage = async () => {
    const item = await getTodoListAsyncStorage();
    setTodoList(item);
  };

  useEffect(() => {
    getTodoListFromStorage();
  }, []);

  const renderCalendarWithSelectableDate = () => {
    return (
      <Calendar
        style={{
          height: '100%',
          width: '100%',
        }}
        key={curSelectedDate}
        current={curSelectedDate}
        // minDate={'2022-01-01'}
        // maxDate={'2033-12-31'}
        markingType={'multi-dot'}
        enableSwipeMonths
        theme={{
          backgroundColor: colors.extraLightGray_1,
          calendarBackground: colors.extraLightGray_1,
          textSectionTitleColor: colors.lightGray,
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 15,
          arrowColor: colors.lightGrayDarker,
          disabledArrowColor: colors.lightGray,
        }}
        dayComponent={({date, state}) => {
          return <DayComponent 
            date={date} 
            state={state} 
            marks={marks}
            selectedDay={curSelectedDate} 
            onDayPress={onDayPress}
          />
        }}
        customHeaderTitle={ <CustomHeader 
          setIsShowSelectModal={setIsShowSelectModal} 
          />
        }
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
      />
    );
  };

  return (
    <View style={styles.container} >
      {renderCalendarWithSelectableDate()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  }
});

export default CalendarElement;