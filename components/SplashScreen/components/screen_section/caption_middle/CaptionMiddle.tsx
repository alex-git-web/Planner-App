import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../colors";
import { SCREENS } from "../../../others/constants";

interface PageProps {
  idScreen: number,
  animation_duration: number
}

const CaptionMiddle: React.FC<PageProps> = ({
  idScreen, 
  animation_duration
}) => {
  const [btnsText, setBtnsText] = useState({
    title: "", 
    subTitle: "", 
  })

  const scale = useSharedValue(0)

  const rTextStyle = useAnimatedStyle(():any => {
    return {
      transform: [
        {scale: scale.value}
      ]
    }
  })
  const renderAnimate = () => {
    scale.value = withTiming(0, {duration: animation_duration})
    setTimeout(() => 
      scale.value = withTiming(1, {duration: animation_duration})
    , animation_duration)
  }

  useEffect(() => {
    renderAnimate()
    
    setTimeout(() => {
      setBtnsText({
        title: SCREENS[idScreen].title,
        subTitle: SCREENS[idScreen].subTitle,
      })
    }, animation_duration)
  }, [idScreen])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.title, rTextStyle]}>
        <Text style={styles.title_text}>
          {btnsText.title}
        </Text>
      </Animated.View>
      <Animated.View style={[styles.subTitle, rTextStyle]}>
        <Text style={styles.subTitle_text}>
          {btnsText.subTitle}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '23%',
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  title: {},
  title_text: {
    color: colors.black,
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center'
  },
  subTitle: {},
  subTitle_text: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center'
  },

});


export default CaptionMiddle;