import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { SCREENS } from "../../../../others/constants";

interface PageProps {
  idScreen: number
  animation_duration: number
}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const FirstImage: React.FC<PageProps> = ({
  idScreen,
  animation_duration,
}) => {
  const scale_earth = useSharedValue(0)
  const scale_people = useSharedValue(0)

  const rEarthStyle = useAnimatedStyle(():any => {
    return {
      transform: [
        {scale: scale_earth.value}
      ]
    }
  })

  const rPeopleStyle = useAnimatedStyle(():any => {
    return {
      transform: [
        {scale: scale_people.value}
      ]
    }
  })

  const earthAnimate = () => {
    scale_earth.value = withTiming(1, {duration: animation_duration})
  }

  const peopleAnimate = () => {
    scale_people.value = withTiming(1, {duration: animation_duration})
  }

  useEffect(() => {
    earthAnimate()

    setTimeout(() => {
      peopleAnimate()
    }, animation_duration);
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.earth_img, rEarthStyle]}>
        <Image source={SCREENS[idScreen].images[0]} resizeMode="contain" style={styles.fillImg}/>
      </Animated.View>
      <Animated.View style={[styles.people_img, rPeopleStyle]}>
        <Image source={SCREENS[idScreen].images[1]} resizeMode="contain" style={styles.fillImg}/>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fillImg: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  earth_img: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width: PAGE_WIDTH * 0.6,
    height: PAGE_WIDTH * 0.6,
  },
  people_img: {
    position: 'absolute',
    zIndex: 1,
    top: '8%',
    left: '27%',
    width: PAGE_WIDTH * 0.33,
    height: PAGE_WIDTH * 0.33,
  }
});

export default FirstImage;