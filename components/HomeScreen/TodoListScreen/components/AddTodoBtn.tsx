import React, {useEffect} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../../../colors";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIsShowAddTodoScreen } from "../../../../redux/slices/appState";
import {animation_duration, bottom_tabs_height, PAGE_WIDTH, } from "../../../SplashScreen/others/constants";

interface PageProps {}

const AddTodoBtn: React.FC<PageProps> = () => { 
  const {home_screen_elements:a_duration} = animation_duration
  const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)

  const dispatch = useAppDispatch()
  const opacity = useSharedValue(0)

  const rBtnStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  useEffect(() => {
   if (isMainAppPartLoaded) opacity.value = withTiming(1, {duration: a_duration})
  }, [isMainAppPartLoaded])

  return (
    <Animated.View style={[rBtnStyle]}>
      <TouchableOpacity style={styles.container} onPress={() => dispatch(setIsShowAddTodoScreen(true))}>
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
    bottom: PAGE_WIDTH * 0.05 + bottom_tabs_height,
    right: PAGE_WIDTH * 0.05,
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