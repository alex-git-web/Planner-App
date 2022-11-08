
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import { colors } from "../../../../../colors";
import { useAppDispatch } from "../../../../../redux/hooks";
import { actionTypes, setData } from "../../../../../redux/slices/homeScreenState";
import { getTodoListAsyncStorage } from "../../../others/asyncStorage";
import { TodoItemType } from "../../../others/constants";
import { CustomHeader } from "./components/customHeader";
import { DayComponent } from "./components/dayComponet";
import { dayNames, monthNames } from "./others/configure";
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
const TODAY_DATE = getCurrentDate()

const CalendarElement: React.FC<PageProps> = ({
  setIsShowSelectModal
}) => {
  const dispatch = useAppDispatch()
  const [todoList, setTodoList] = useState<Array<TodoItemType>>();

  const [selectedDay, setSelectedDay] = useState<string>(TODAY_DATE);
  const [calendarHeader, setCalendarHeader] = useState<DayDataType>({
    monthName: monthNames[Number(TODAY_DATE.split('-')[1]) - 1],
    dayName: dayNames[Number(TODAY_DATE.split('-')[2]) - 1],
    dayNumber: Number(TODAY_DATE.split('-')[2]),
    year: Number(TODAY_DATE.split('-')[0]),
  });

  const marks = useMemo(() => {
    const todo_list = todoList?.filter(todo => { // => todos of current selected year and month
      if (
        (todo.event_date.split('-')[0] === selectedDay.split('-')[0]) // year
        && (todo.event_date.split('-')[1] === selectedDay.split('-')[1]) // month
      ) return todo
    })
    return todo_list?.map(todo => {
      // returning multiple dots may be implemented in the future
      // now - one dot
      return { [todo.event_date]: { marked: true, dotColor: colors.blue } }
    })
  }, [todoList, selectedDay])

  const onDayPress = useCallback((day:any) => {
    setSelectedDay(day.dateString);
    setCalendarHeader({
      monthName: monthNames[day.month - 1],
      dayName: getDayName(day.dateString, "en"),
      dayNumber: day.day,
      year: day.year,
    })
    dispatch(setData({
      key: actionTypes.selectCalendarDate, 
      value: day.dateString
    }))
  }, []);


  const onPressArrowLeft = useCallback((subtract:any, month:any) => subtract(), []);
  const onPressArrowRight = useCallback((add:any, month:any) => add(), []);

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
        current={TODAY_DATE}
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
            selectedDay={selectedDay} 
            onDayPress={onDayPress}
          />
        }}
        customHeaderTitle={<CustomHeader calendarHeader={calendarHeader} setIsShowSelectModal={setIsShowSelectModal} />}
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