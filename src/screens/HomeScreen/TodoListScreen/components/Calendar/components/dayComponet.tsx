import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../../../../../colors';
import { PAGE_WIDTH } from '../../../../../../common/constants';

interface PageProps {
    date: any,
    state: any,
    marks: any,
    onDayPress: Function,
    selectedDay: string
}

export const DayComponent: React.FC<PageProps> = ({
    date, 
    state,
    marks,
    onDayPress,
    selectedDay
}) => {
    return (
        <TouchableOpacity style={[styles.dayNumberContainer, 
          { backgroundColor: state === 'selected' ? colors.orange : 
            date?.dateString === selectedDay ? colors.lightGreen : null
          }
        ]} onPress={() => onDayPress(date)}>
          <Text style={[styles.dayNumberText, 
            { color: state === 'disabled' ? colors.lightGrayDarker :
              state === 'selected' ? colors.white : colors.black
            }]}>
              {date?.day}
            </Text>
          { 
            marks?.find((mark: {}) => (Object.keys(mark)[0] === date?.dateString))
            ? <View style={[
                styles.dotTodosIndicator,
                { backgroundColor: state === 'selected' ? colors.white : colors.blue}
              ]}></View> 
            : null
          }
          
        </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
    dayNumberContainer: {
      borderRadius: PAGE_WIDTH * 0.02,
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH * 0.075, 
      height: PAGE_WIDTH * 0.075, 
    },
    dayNumberText: {
      fontSize: 17,
      fontWeight: '600',
    },
    dotTodosIndicator: {
      width: PAGE_WIDTH * 0.012,
      height: PAGE_WIDTH * 0.012,
      borderRadius: PAGE_WIDTH * 0.012,
    }
})