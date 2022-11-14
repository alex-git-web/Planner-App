import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../../../../../../colors";
import { PAGE_HEIGHT, PAGE_WIDTH } from "../../../../../common/constants";

interface PageProps {
  selectedDate?: string | any,
}

type DateElement = {
  date: string,
  shortDayName: string,
  dateNum: string,
}

const options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const CalendarPart: React.FC<PageProps> = ({
  selectedDate,
}) => {
  const selected_date = new Date(selectedDate).toLocaleDateString(undefined, options)
  const [headerCaption, setHeaderCaption] = useState<string>()
  const [checkedDate, setCheckedDate] = useState<string>(selected_date)
  const [dates, setDates] = useState<Array<DateElement>>()

  const generateDatesRow = () => {
    const curDate = new Date(selectedDate) // ex:'2022-11-03'
    const f = (p:any) => (p).toLocaleDateString(undefined, options)
    const dates = []
    let prevDate = new Date(curDate)

    for (let i = 0; i < curDate.getDay() - 1; i++) {
      prevDate.setDate(prevDate.getDate() - 1)
      dates.push(f(prevDate))
    }
    // ex: dates = ['2022.11.02', '2022-11.01', '2022.01.31']
    dates.reverse()
    dates.push(f(curDate))
    // ex: dates = ['2022.10.31', '2022.11.01', '2022.11.02', '2022.11.03']

    prevDate = new Date(curDate)
    for (let i = curDate.getDay(); i < 7; i++) {
      prevDate.setDate(prevDate.getDate() + 1)
      dates.push(f(prevDate))
    }
    // ex: ["31.10.2022", "01.11.2022", "02.11.2022", "03.11.2022", "04.11.2022", "05.11.2022", "06.11.2022"]
   
    return dates.map(date => {
      return {
        date,
        shortDayName: date.split(',')[0][0],
        dateNum: date.split(', ')[1].split(' ')[1]
      }
    })
  }

  useEffect(() => {
    setHeaderCaption(
      `${selected_date.split(', ')[1].split(' ')[0]}, ${selected_date.split(', ')[2]}`
    )
    setDates(generateDatesRow())
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.caption_text}>{headerCaption}</Text>
      <View style={styles.days_container}>
        {
          dates?.map(date => {
            return (
              <View key={date.date} style={styles.day_item}>
                <Text style={styles.day_name}>{date.shortDayName}</Text>
                <TouchableOpacity style={[styles.day_number_container,
                  { backgroundColor: date.date === checkedDate ? colors.orange : null }
                  ]}
                  onPress={() => setCheckedDate(date.date)}
                >
                  <Text style={[styles.day_number_text,
                    { color: date.date === checkedDate ? colors.white : colors.black }
                  ]}>{date.dateNum}</Text>
                </TouchableOpacity>
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'stretch',
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.extraLightGray_1,
  },
  caption_text: {
    textAlign: 'center',
    fontSize: 17,
    color: colors.black,
    fontWeight: '700',
    marginBottom: 20,
  },
  days_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  day_item: {
  },
  day_name: {
    fontSize: 15,
    color: colors.lightGray,
    fontWeight: '600',
    textAlign: 'center'
  },
  day_number_container: {
    width: PAGE_WIDTH * 0.075, 
    height: PAGE_WIDTH * 0.075, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  day_number_text: {
    fontSize: 17,
    fontWeight: '600',
  },
});