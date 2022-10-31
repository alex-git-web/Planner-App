import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import FirstImage from "./components/FirstImage";
import SecondImage from "./components/SecondImage";
import ThirdImage from "./components/ThirdImage";

interface PageProps {
  idScreen: number
  animation_duration: number
}

const ImageTop: React.FC<PageProps> = ({
  idScreen,
  animation_duration
}) => {
  const [imageIndex, setImageIndex] = useState<number>(0)

  const opacity = useSharedValue(0)
  
  const rContainerStyle = useAnimatedStyle(():any => {
    return {
      opacity: opacity.value
    }
  })

  const renderAnimate = () => {
    opacity.value = withTiming(0, {duration: animation_duration})
    setTimeout(() => 
      opacity.value = withTiming(1, {duration: animation_duration})
    , animation_duration)
  }

  useEffect(() => {
    renderAnimate()
    setTimeout(() => setImageIndex(idScreen), animation_duration - 100)
  }, [idScreen])

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      {
        imageIndex == 0 ? <FirstImage idScreen={imageIndex} animation_duration={animation_duration} /> :
        imageIndex == 1 ? <SecondImage idScreen={imageIndex} animation_duration={animation_duration} /> :
        imageIndex == 2 ? <ThirdImage idScreen={imageIndex} animation_duration={animation_duration} /> : null
      }
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '45%',
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ImageTop;