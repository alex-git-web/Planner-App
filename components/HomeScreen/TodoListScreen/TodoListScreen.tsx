import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "../../../colors";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsMainAppPartLoaded } from "../../../redux/slices/appState";
import { animation_duration, bottom_tabs_height, PAGE_HEIGHT, PAGE_WIDTH } from "../../SplashScreen/others/constants";
import AddTodoBtn from "./components/AddTodoBtn";
import Calendar from "./components/Calendar";
import TodoList from "./components/TodoList";

interface PageProps {}

const TodoListScreen: React.FC<PageProps> = () => {
 
  const isMainAppPartLoaded = useAppSelector(state => state.appConfigure.isMainAppPartLoaded)
  const { showHomeScreen:duration } = animation_duration
  const dispatch = useAppDispatch()

  const width = useSharedValue(0)
  const height = useSharedValue(0)
  const borderRadius = useSharedValue(PAGE_WIDTH * 0.4)
  const marginBottom = useSharedValue(PAGE_HEIGHT * 0.7)

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
      marginBottom: marginBottom.value,
    }
  })

  const containerAnimate = () => {
    // 1 animation step
    width.value = withTiming(PAGE_WIDTH * 0.4, { duration })
    height.value = withTiming(PAGE_WIDTH * 0.4, { duration })
    // 2 animation step
    width.value = withDelay(duration, withTiming(PAGE_WIDTH, { duration }))
    height.value = withDelay(duration, withTiming(PAGE_HEIGHT, { duration }))
    borderRadius.value = withDelay(duration, withTiming(0, { duration }))
    marginBottom.value = withDelay(duration, withTiming(0, { duration }))

    setTimeout(() => {
      dispatch(setIsMainAppPartLoaded(true))
    }, duration * 2)
  }

  useEffect(() => {
    containerAnimate()
     if (!isMainAppPartLoaded) containerAnimate()
  }, [])

  return ( 
    <View style={[
      styles.container,
      { backgroundColor:  !isMainAppPartLoaded ? colors.orange : colors.white }
    ]}>
      <Animated.View style={[styles.content, rContainerStyle]}>
        <Calendar />
        {/* <TodoList /> */}
        <AddTodoBtn />
      </Animated.View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT - bottom_tabs_height,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
});

export default TodoListScreen;