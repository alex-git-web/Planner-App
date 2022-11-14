import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../colors";
import { animation_duration, bottom_tabs_height } from "../../../../common/constants";
import { useAppSelector } from "../../../../redux/hooks";
import { TodoListElement } from "./TodoList/TodoListElement";

const {home_screen_elements:a_duration} = animation_duration

interface PageProps {}

export const TodoListContainer: React.FC<PageProps> = () => {
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

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Text style={styles.caption}>Priority Tasks</Text>
      <TodoListElement />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingBottom: bottom_tabs_height * 3
  },
  caption: {
    fontSize: 20, 
    color: colors.black,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  }
});