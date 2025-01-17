import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { PAGE_HEIGHT, PAGE_WIDTH } from "../../../../../../common/constants";
import { SCREENS } from "../../../../others/constants";

interface PageProps {
  idScreen: number
  animation_duration: number
}

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
    scale_people.value = withDelay(
      animation_duration,
      withTiming(1, {duration: animation_duration})
    ) 
  }

  useEffect(() => {
    earthAnimate()
    peopleAnimate()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.earth_img, rEarthStyle]}>
        <Image source={SCREENS[idScreen].images[0]} resizeMode="stretch" style={styles.fillImg}/>
      </Animated.View>
      <Animated.View style={[styles.people_img, rPeopleStyle]}>
        <Image source={SCREENS[idScreen].images[1]} resizeMode="stretch" style={styles.fillImg}/>
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
    width: PAGE_WIDTH * 0.4,
    height: PAGE_WIDTH * 0.35,
  },
  people_img: {
    position: 'absolute',
    zIndex: 1,
    top: PAGE_WIDTH * 0.18,
    left: PAGE_WIDTH * 0.17,
    width: PAGE_WIDTH * 0.45,
    height: PAGE_WIDTH * 0.4,
  }
});

export default FirstImage;