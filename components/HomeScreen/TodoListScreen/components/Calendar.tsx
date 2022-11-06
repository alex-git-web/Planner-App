import React, { useState, useCallback } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { colors } from "../../../../colors";
import { PAGE_WIDTH } from "../../../SplashScreen/others/constants";
import { dayNames, monthNames } from "./Calendar/configure";
import { getCurrentDate } from "./Calendar/functions";
import testIDs from "./Calendar/testIDs";

interface PageProps {}

const CalendarView: React.FC<PageProps> = () => {
  const TODAY_DATE = getCurrentDate();
  const [selected, setSelected] = useState<string>('2022-11-30');
  const [selectedValue, setSelectedValue] = useState(new Date());

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  const getNewSelectedDate = useCallback(
    (date:any, shouldAdd:any) => {
      const newMonth = new Date(date).getMonth();
      const month = shouldAdd ? newMonth + 1 : newMonth - 1;
      const newDate = new Date(selectedValue.setMonth(month));
      const newSelected = new Date(newDate.setDate(1));
      return newSelected;
    },
    [selectedValue]
  );
  const onPressArrowLeft = useCallback(
    (subtract:any, month:any) => {
      const newDate = getNewSelectedDate(month, false);
      setSelectedValue(newDate);
      subtract();
    },
    [getNewSelectedDate]
  );

  const onPressArrowRight = useCallback(
    (add:any, month:any) => {
      const newDate = getNewSelectedDate(month, true);
      setSelectedValue(newDate);
      add();
    },
    [getNewSelectedDate]
  );

  const CustomDay = (
    <TouchableOpacity style={styles.customHeaderTitleContainer} onPress={() => console.warn('Tapped!')}>
      <Text style={styles.dayNameText}>{dayNames[selectedValue.getDay()]}</Text>
      <Text style={styles.dayDataText}>
        {monthNames[selectedValue.getMonth()]} {selectedValue.getDay() + 1}, {selectedValue.getFullYear()}
      </Text>
    </TouchableOpacity>
  );

  const CustomHeaderTitle = (
    <TouchableOpacity style={styles.customHeaderTitleContainer} onPress={() => console.warn('Tapped!')}>
      <Text style={styles.dayNameText}>{dayNames[selectedValue.getDay()]}</Text>
      <Text style={styles.dayDataText}>
        {monthNames[selectedValue.getMonth()]} {selectedValue.getDay() + 1}, {selectedValue.getFullYear()}
      </Text>
    </TouchableOpacity>
  );

  const onDayPress = useCallback((day:any) => {
    setSelected(day.dateString);
  }, []);

  const renderCalendarWithSelectableDate = () => {
    return (
      <Calendar
        // testID={testIDs.calendars.FIRST}
        style={{
          height: '100%',
          width: '100%',
        }}
        markingType={'multi-dot'}
        enableSwipeMonths
        // onDayPress={onDayPress}
        markedDates={{
          '2022-11-10': {dots: [vacation, massage, workout]},
          '2022-11-21': {dots: [massage, workout]},
          [selected]: {selected:true, disableTouchEvent: true, selectedColor: colors.lightGreen, selectedTextColor: colors.black},
        }}
        theme={{
          backgroundColor: colors.extraLightGray_1,
          calendarBackground: colors.extraLightGray_1,
          textSectionTitleColor: colors.lightGray,
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 15,
          textMonthFontSize: 15,
          textDayStyle: { color: colors.black, fontWeight: '700', fontSize: 15},
          textDisabledColor: colors.lightGrayDarker,
          selectedDayBackgroundColor: colors.orange,
          selectedDayTextColor: colors.white,
          arrowColor: colors.lightGrayDarker,
          disabledArrowColor: colors.lightGray,
        }}
        dayComponent={({date, state}) => {
          return (
            <TouchableOpacity style={[styles.dayNumberContainer, 
              { backgroundColor: state === 'selected' ? colors.orange : 
                date?.dateString === selected ? colors.lightGreen : null
              }
            ]} onPress={() => onDayPress(date)}>
              <Text style={[styles.dayNumberText, 
                { color: state === 'disabled' ? colors.lightGrayDarker :
                  state === 'selected' ? colors.white : colors.black
                }]}>
                  {date?.day}
                </Text>
            </TouchableOpacity>
          );
        }}
        customHeaderTitle={CustomHeaderTitle}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderCalendarWithSelectableDate()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '55%',
    backgroundColor: colors.extraLightGray_1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: '5%',
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  customHeaderTitleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  dayNameText: {
    color: colors.black,
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 5
  },
  dayDataText: {
    color: colors.lightGray,
    fontSize: 15,
    fontWeight: '600'
  },
  dayNumberContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: PAGE_WIDTH * 0.08, 
    height: PAGE_WIDTH * 0.08, 
  },
  dayNumberText: {
    fontSize: 15,
    fontWeight: '600',
  }
});

export default CalendarView;