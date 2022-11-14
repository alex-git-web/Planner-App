import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { PAGE_HEIGHT, PAGE_WIDTH } from "../../../../../../common/constants";
import { SCREENS } from "../../../../others/constants";

interface PageProps {
  idScreen: number
  animation_duration: number
}

const SecondImage: React.FC<PageProps> = ({
  idScreen,
  animation_duration,
}) => {
  const scale_imgPart = useSharedValue(0)
  const scale_lines = useSharedValue(0)

  const rImgPartStyle = useAnimatedStyle(():any => {
    return {
      transform: [
        {scale: scale_imgPart.value}
      ]
    }
  })

  const rLinesStyle = useAnimatedStyle(():any => {
    return {
      transform: [
        {scale: scale_lines.value}
      ]
    }
  })

  const imgPartAnimate = () => {
    scale_imgPart.value = withTiming(1, {duration: animation_duration})
  }
  const linesAnimate = () => {
    scale_lines.value = withDelay(
      animation_duration,
      withTiming(1, {duration: animation_duration})
    ) 
  }

  useEffect(() => {
    imgPartAnimate()
    linesAnimate()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.imgPart_img, rImgPartStyle]}>
        <Image source={SCREENS[idScreen].images[0]} resizeMode="stretch" style={styles.fillImg}/>
      </Animated.View>
      <Animated.View style={[styles.lines_img, rLinesStyle]}>
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
  imgPart_img: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    width: PAGE_WIDTH * 0.7,
    height: PAGE_WIDTH * 0.6,
  },
  lines_img: {
    position: 'absolute',
    zIndex: 1,
    top: PAGE_WIDTH * 0.37,
    left: PAGE_WIDTH * 0.17,
    width: PAGE_WIDTH * 0.17,
    height: PAGE_WIDTH * 0.25,
  }
});

export default SecondImage;