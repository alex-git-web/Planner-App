import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "../../../../colors";
import { animation_duration, PAGE_HEIGHT, PAGE_WIDTH } from "../../../common/constants";
import { images } from "../../../common/images";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsMainAppPartLoaded } from "../../../redux/slices/appState";
import { TodoAddScreen } from "../TodoAddScreen/TodoAddScreen";
import AddTodoBtn from "./components/AddTodoBtn";
import { CalendarContainer } from "./components/CalendarContainer";
import { TodoListContainer } from "./components/TodoListContainer";

interface PageProps {}

const TodoListScreen: React.FC<PageProps> = () => {
  const {isMainAppPartLoaded} = useAppSelector(state => state.appConfigure)
  const {isShowModal} = useAppSelector(state => state.homeScreen)
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
  }, [])

  return ( 
    <View style={styles.container}>
      { !isMainAppPartLoaded ?
        <Image source={images.home_screen_bg} style={[styles.screen_bg_img]}/>
        : null
      }
      <Animated.View style={[styles.content, rContainerStyle]}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <CalendarContainer />
          <TodoListContainer />
        </ScrollView>
      </Animated.View>
      <AddTodoBtn />

      { isShowModal ? <TodoAddScreen /> : null }
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  screen_bg_img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },
  content: {
    alignItems: "stretch",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
});

export default TodoListScreen;