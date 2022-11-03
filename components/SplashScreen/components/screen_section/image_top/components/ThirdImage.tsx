import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { SCREENS } from "../../../../others/constants";

interface PageProps {
  idScreen: number
  animation_duration: number
}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const ThirdImage: React.FC<PageProps> = ({
  idScreen,
  animation_duration,
}) => {
  const bottom_rocket = useSharedValue(-60)
  const right_rocket = useSharedValue(-60)

  const top_smallStars = useSharedValue(-60)

  const top_bigStar = useSharedValue(-60)
  const rotate_bigStar = useSharedValue(0)
  const scale_bigStar = useSharedValue(1)

  const rRocketStyle = useAnimatedStyle(():any => {
    return {
      bottom: `${bottom_rocket.value}%`,
      right: `${right_rocket.value}%`,
    }
  })

  const rSmallStarsStyle = useAnimatedStyle(():any => {
    return {
      top: `${top_smallStars.value}%`,
    }
  })

  const rBigStarStyle = useAnimatedStyle(():any => {
    return {
      top: `${top_bigStar.value}%`,
      transform: [
        {rotate: `${rotate_bigStar.value}deg`},
        {scale: scale_bigStar.value},
      ]
    }
  })

  const rocketAnimate = () => {
    bottom_rocket.value = withTiming(0, {duration: animation_duration * 1.3})
    right_rocket.value = withTiming(10, {duration: animation_duration * 1.3})
  }
  const smallStarsAnimate = () => {
    top_smallStars.value = withTiming(0, {duration: animation_duration * 1.5})
  }

  const bigStarAnimate = () => {
    top_bigStar.value = withTiming(22, {duration: animation_duration * 1.5 })
    rotate_bigStar.value = withTiming(360, {duration: animation_duration * 1.7})
    // scale_bigStar.value = withTiming(1, {duration: animation_duration})
  }

  useEffect(() => {
    rocketAnimate()
    smallStarsAnimate()

    setTimeout(() => {
      bigStarAnimate()
    }, animation_duration);
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.rocket_img, rRocketStyle]}>
        <Image source={SCREENS[idScreen].images[0]} resizeMode="contain" style={styles.fillImg}/>
      </Animated.View>
      <Animated.View style={[styles.smallStars_img, rSmallStarsStyle]}>
        <Image source={SCREENS[idScreen].images[1]} resizeMode="contain" style={styles.fillImg}/>
      </Animated.View>
      <Animated.View style={[styles.bigStar_img, rBigStarStyle]}>
        <Image source={SCREENS[idScreen].images[2]} resizeMode="contain" style={styles.fillImg}/>
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
  rocket_img: {
    position: 'absolute',
    zIndex: 2,
    width: '70%',
    height: '70%',
  },
  smallStars_img: {
    position: 'absolute',
    zIndex: 1,
    top: '-60%',
    width: '100%',
    height: '100%',
  },
  bigStar_img: {
    position: 'absolute',
    zIndex: 1,
    right: '37%',
    width: '20%',
    height: '20%',
  },
});

export default ThirdImage;