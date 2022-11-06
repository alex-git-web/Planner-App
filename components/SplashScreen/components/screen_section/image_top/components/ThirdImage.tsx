import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { setIsSplashScreen } from "../../../../../../redux/slices/appState";
import { SCREENS } from "../../../../others/constants";

interface PageProps {
  idScreen: number
  animation_duration: number
}

const ThirdImage: React.FC<PageProps> = ({
  idScreen,
  animation_duration,
}) => {
  const dispatch = useAppDispatch()

  const bottom_rocket = useSharedValue(-60)
  const right_rocket = useSharedValue(-60)

  const top_smallStars = useSharedValue(-60)

  const top_bigStar = useSharedValue(-60)
  const rotate_bigStar = useSharedValue(0)
  const scale_bigStar = useSharedValue(1)
  const zIndex_bigStar = useSharedValue(0)

  const isHideSplashScreen = useAppSelector((state) => state.appConfigure.isHideSplashScreen)

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
      ],
      zIndex: zIndex_bigStar.value
    }
  })

  const rocketAnimate = (duration:number) => {
    bottom_rocket.value = withTiming(0, {duration})
    right_rocket.value = withTiming(10, {duration})
  }

  const smallStarsAnimate = (duration:number) => {
    top_smallStars.value = withTiming(0, {duration})
  }

  const bigStarAnimate = (duration:number) => {
    top_bigStar.value = withTiming(20, {duration})
    rotate_bigStar.value = withTiming(350, {duration})
  }

  const goToHomeScreen = (duration:number) => {
    // Scale "big star image"
    zIndex_bigStar.value = 3
    rotate_bigStar.value = withRepeat(withTiming(0, {duration}), 1, true)
    scale_bigStar.value = withTiming(40, {duration})

    // condition for showing "Home Screen"
    setTimeout(() => { 
      dispatch(setIsSplashScreen(false))
    }, duration)
  }

  useEffect(() => {
    rocketAnimate(animation_duration * 1.3)
    smallStarsAnimate(animation_duration * 1.3)

    setTimeout(() => {
      bigStarAnimate(animation_duration * 1.5)
    }, animation_duration);
  }, [])

  useEffect(() => {
    if (isHideSplashScreen) goToHomeScreen(animation_duration * 1.5)
  }, [isHideSplashScreen])

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
    right: '38%',
    width: '20%',
    height: '20%',
  },
});

export default ThirdImage;