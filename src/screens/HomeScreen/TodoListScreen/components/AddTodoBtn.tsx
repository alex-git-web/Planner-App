import React, {useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { add, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../colors";
import { animation_duration, bottom_tabs_height, PAGE_WIDTH } from "../../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setData } from "../../../../redux/slices/homeScreenState";

interface PageProps {}

const AddTodoBtn: React.FC<PageProps> = ({}) => { 
  const {home_screen_elements:a_duration} = animation_duration
  const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)
  const { isShowModal } = useAppSelector(state => state.homeScreen)

  const dispatch = useAppDispatch()
  const opacity = useSharedValue(0)

  const rBtnStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  const btnPress = () => {
    dispatch(setData({
      key: 'isShowModal',
      value: true
    }))
  }

  useEffect(() => {
   if (isMainAppPartLoaded) opacity.value = withTiming(1, {duration: a_duration})
  }, [isMainAppPartLoaded])
  
  useEffect(() => {
    console.log(isShowModal)
   if (isShowModal) {
    dispatch(setData({
      key: 'isOpenModal',
      value: true
    }))
   }
  }, [isShowModal])

  return (
    <Animated.View style={[rBtnStyle]}>
      <TouchableOpacity style={styles.container} onPress={() => btnPress()}>
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH * 0.17,
    height: PAGE_WIDTH * 0.17,
    borderRadius: PAGE_WIDTH * 0.17,
    position: 'absolute',
    zIndex: 3,
    bottom: PAGE_WIDTH * 0.1 + bottom_tabs_height,
    right: -PAGE_WIDTH * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: PAGE_WIDTH * 0.2,
    elevation: 18,
    backgroundColor: colors.black
  },
  plus: {
    fontSize: 33, 
    color: colors.white,
    fontWeight: '400',
  }
});

export default AddTodoBtn;