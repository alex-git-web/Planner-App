import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useMemo } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { monthNames, yearNames } from '../others/configure';
import { animation_duration, PAGE_WIDTH } from '../../../../../../common/constants';
import { colors } from '../../../../../../../colors';
import { useDispatch } from 'react-redux';
import { setData } from '../../../../../../redux/slices/homeScreenState';

export const modalTypes = {
  select_year: 'select_year',
  select_month: 'select_month',
}

interface PageProps {
  isShowSelectModal: boolean
  setIsShowSelectModal: any,
}

const {home_screen_elements:a_duration} = animation_duration

export const SelectModal: React.FC<PageProps> = ({
    isShowSelectModal,
    setIsShowSelectModal,
}) => {
    const dispatch = useDispatch()
    const [modalType, setModalType] = useState<string>(modalTypes.select_month)
    const [selectedDate, setSelectedDate] = useState<{monthNumber: string, year: string}>({monthNumber: '', year: ''})
    const width = useSharedValue(0)
    const height = useSharedValue(0)
    const borderRadius = useSharedValue(0)
    const opacity = useSharedValue(0)
    const opacity_content = useSharedValue(0)

    const rContainerStyle = useAnimatedStyle(():any => {
      return { 
        width: `${width.value}%`,
        height: `${height.value}%`,
        borderRadius: borderRadius.value,
        opacity: opacity.value,
      }
    }, [])

    const rContentStyle = useAnimatedStyle(():any => {
      return { 
        opacity: opacity_content.value,
      }
    }, [])

    const showModalAnimate = () => {
        // animation 1 step
        opacity.value = withTiming(1, {duration: a_duration})
        width.value = withTiming(15, {duration: a_duration})
        height.value = withTiming(15, {duration: a_duration})
        borderRadius.value = withDelay(a_duration, withTiming(PAGE_WIDTH * 0.5, {duration: a_duration}))
        // animation 2 step
        width.value = withDelay(a_duration, withTiming(100, {duration: a_duration}))
        height.value = withDelay(a_duration, withTiming(100, {duration: a_duration}))
        borderRadius.value = withDelay(a_duration * 1.5, withTiming(30, {duration: a_duration}))
        opacity_content.value = withDelay(a_duration * 1.5 + a_duration, withTiming(1, {duration: a_duration}))
    }

    const hideModalAnimate = () => {
        opacity.value = withTiming(0, {duration: a_duration})
        opacity_content.value = withTiming(0, {duration: a_duration})
        //borderRadius.value = withDelay(a_duration, withTiming(0))
        width.value = withDelay(a_duration, withTiming(0))
        height.value = withDelay(a_duration, withTiming(0))
    }
  
    useEffect(() => {
      if (isShowSelectModal) showModalAnimate()
      else hideModalAnimate()
    }, [isShowSelectModal])

    const items = useMemo(() => {
      let a = null
      modalType === modalTypes.select_month ? a = monthNames : a = yearNames
      
      return a.map((name:string, idx:number) => {
        return (
          <TouchableOpacity key={name} style={styles.item} onPress={() => {
            setSelectedDate(
              modalType === modalTypes.select_month 
              ? {...selectedDate, monthNumber: (idx + 1).toString() }
              : {...selectedDate, year: name }
            )
          }}>
            <Text key={name} style={[styles.item_text, 
              { color: 
                modalType === modalTypes.select_month && selectedDate.monthNumber === (idx + 1).toString() ? colors.orange :
                modalType === modalTypes.select_year && selectedDate.year === name ? colors.orange : colors.lightGrayDarker
              }]}>{name.substring(0, 6)}</Text>
          </TouchableOpacity>
        ) 
      })
    }, [modalType, selectedDate])

    const nextToCalendar = () => {
      if (selectedDate.monthNumber && selectedDate.year) {
        dispatch(setData({
          key: 'curSelectedMonth',
          value: `${selectedDate.year}-${selectedDate.monthNumber}`
        }))
        setIsShowSelectModal(false)
      }
    }

    return (
      <Animated.View style={[styles.container, rContainerStyle]}>
        <Animated.View style={[styles.content, rContentStyle]}>
          <View style={styles.toggle_btns_container}>
            <TouchableOpacity style={[styles.caption_container, { backgroundColor: modalType === modalTypes.select_month ? colors.lightGray : colors.extraLightGray }]} onPress={() => setModalType(modalTypes.select_month)}>
              <Text style={styles.caption_text}> Month </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.caption_container, { backgroundColor: modalType === modalTypes.select_year ? colors.lightGray : colors.extraLightGray }]} onPress={() => setModalType(modalTypes.select_year)}>
              <Text style={styles.caption_text}> Year </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.items_wrapper}>{ items }</View>

          <View style={styles.bottom_btns_container}>
            <TouchableOpacity style={styles.closeModalBtn} onPress={() => setIsShowSelectModal(false)}>
              <AntDesign name='closecircleo' color={colors.lightGrayDarker} size={PAGE_WIDTH * 0.08}/>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.findDateBtn, { opacity: (selectedDate.monthNumber.length == 0 || selectedDate.year.length == 0) ? 0.5 : 1 }]} 
              disabled={(selectedDate.monthNumber.length == 0 || selectedDate.year.length == 0)} 
              onPress={() => nextToCalendar()}>
              <Feather name='arrow-right-circle' color={colors.lightGrayDarker} size={PAGE_WIDTH * 0.08}/>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 3,
      top: 0,
      marginTop: '5%',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    content: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: '5%',
      paddingHorizontal: '5%',
    },
    toggle_btns_container: {
      width: '100%',
      height: '15%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      paddingHorizontal: '5%'
    },
    caption_container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      width: '45%',
    },
    caption_text: {
      fontSize: 17, 
      color: colors.lightGrayDarker_1,
      fontWeight: '600',
    }, 
    items_wrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    item: {
      width: '25%',
      paddingVertical: '7%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    item_text: {
      fontSize: 15, 
      fontWeight: '500',
    },
    bottom_btns_container: {
      width: '40%',
      height: '15%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      paddingHorizontal: '5%'
    },
    closeModalBtn: {
    },
    findDateBtn: {
    }
})