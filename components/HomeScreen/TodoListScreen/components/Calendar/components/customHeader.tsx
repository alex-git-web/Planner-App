import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../../../../colors';

interface PageProps {
  calendarHeader: any,
  setIsShowSelectModal: any
}

export const CustomHeader: React.FC<PageProps> = ({
  calendarHeader, 
  setIsShowSelectModal
}) => {
    return (
      <TouchableOpacity style={styles.customHeaderTitleContainer} onPress={() => setIsShowSelectModal(true)}>
        <Text style={styles.dayNameText}>{calendarHeader?.dayName}</Text>
        <Text style={styles.dayDataText}>
          {calendarHeader?.monthName} {calendarHeader?.dayNumber}, {calendarHeader?.year}
        </Text>
      </TouchableOpacity>
      );
}

const styles = StyleSheet.create({
  customHeaderTitleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  dayNameText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5
  },
  dayDataText: {
    color: colors.lightGray,
    fontSize: 15,
    fontWeight: '600'
  },
})