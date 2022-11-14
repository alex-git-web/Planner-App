import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../../../../../../colors';
import { useAppSelector } from '../../../../../../redux/hooks';
import { monthNames } from '../others/configure';
import { getDayName } from '../others/functions';

interface PageProps {
  setIsShowSelectModal: any
}

export const CustomHeader: React.FC<PageProps> = ({
  setIsShowSelectModal
}) => {
  const { curSelectedDate } = useAppSelector(state => state.homeScreen)
  const [date, setDate] = useState<Array<string>>(curSelectedDate.split('-'))
  
  useEffect(() => {
    setDate(curSelectedDate.split('-'))
  }, [curSelectedDate])

  return (
    <TouchableOpacity style={styles.customHeaderTitleContainer} onPress={() => setIsShowSelectModal(true)}>
      <Text style={styles.dayNameText}>{ getDayName(curSelectedDate, 'en') }</Text>
      <Text style={styles.dayDataText}>
        { monthNames[Number(date[1]) - 1] } { date[2] }, { date[0] }
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
    fontSize: 21,
    fontWeight: '600',
    marginBottom: 5
  },
  dayDataText: {
    color: colors.lightGray,
    fontSize: 15,
    fontWeight: '600'
  },
})