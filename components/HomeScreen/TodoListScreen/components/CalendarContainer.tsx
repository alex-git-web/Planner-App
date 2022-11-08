import React, {useEffect, useState} from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from '../../../../colors';
import { useAppSelector } from '../../../../redux/hooks';
import { animation_duration, PAGE_HEIGHT } from '../../../SplashScreen/others/constants';
import CalendarElement from './Calendar/CalendarElement';
import { modalTypes, SelectModal } from './Calendar/components/selectModal';

const {home_screen_elements:a_duration} = animation_duration

interface PageProps {}

export const CalendarContainer: React.FC<PageProps> = () => {
  const [isShowSelectModal, setIsShowSelectModal] = useState<boolean>(false)
  const [typeSelectModal, setTypeSelectModal] = useState<string>(modalTypes.select_month)

  const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)

  const opacity = useSharedValue(0)

  const rContainerStyle = useAnimatedStyle(() => {
    return { 
      opacity: opacity.value
    }
  }, [])

  useEffect(() => {
    if (isMainAppPartLoaded) opacity.value = withTiming(1, {duration: a_duration})
  }, [isMainAppPartLoaded])

  useEffect(() => {
    console.log(isShowSelectModal)
  }, [isShowSelectModal])


  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <CalendarElement 
        setIsShowSelectModal={setIsShowSelectModal}
      />
      <SelectModal 
        isShowSelectModal={isShowSelectModal}
        setIsShowSelectModal={setIsShowSelectModal}
        typeModal={typeSelectModal}
        setTypeSelectModal={setTypeSelectModal}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: PAGE_HEIGHT * 0.55,
    backgroundColor: colors.extraLightGray_1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: 'center'
  },
});