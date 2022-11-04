import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../colors";
import { useAppDispatch } from "../../../../../redux/hooks";
import { setIsHideSplashScreen } from "../../../../../redux/slices/appState";
import { SCREENS } from "../../../others/constants";

interface PageProps {
  idScreen: number,
  setIdScreen: any,
  animation_duration: number
}

type BtnAnimateType = {
  buttonType: string,
  scale_btn: number,
  scale_text: number,
  opacity: number,
}

const btnTypes = {
  first_btn: "first_btn",
  second_btn: "second_btn",
}

const ButtonsButtom: React.FC<PageProps> = ({
  idScreen,
  setIdScreen,
  animation_duration
}) => {
  const [btnsText, setBtnsText] = useState({
    firstBtnText: "", 
    secondBtnText: "", 
  })

  const scale_first_btn = useSharedValue(0)
  const scale_first_btn_text = useSharedValue(0)
  const opacity_first_btn = useSharedValue(1)

  const scale_second_btn = useSharedValue(0)
  const opacity_second_btn_text = useSharedValue(1)

  const dispatch = useAppDispatch()

  const rBtnStyle = [
    useAnimatedStyle(():any => { // first btn
      return {
        transform: [
          {scale: scale_first_btn.value}
        ],
        opacity: opacity_first_btn.value
      }
    }),
    useAnimatedStyle(():any => { // second btn
      return {
        transform: [
          {scale: scale_second_btn.value}
        ],
      }
    }),
  ]

  const rBtnTextStyle = [
    useAnimatedStyle(():any => { // first btn
      return {
        transform: [
          {scale: scale_first_btn_text.value}
        ]
      }
    }),
    useAnimatedStyle(():any => { // first btn
      return {
        opacity: opacity_second_btn_text.value
      }
    }),
    null // second btn
  ]

  const btnAnimate = ({buttonType, scale_btn, scale_text, opacity}:BtnAnimateType) => {
    if (buttonType == btnTypes.first_btn) {
      scale_first_btn.value = withTiming(scale_btn, {duration: animation_duration})
      scale_first_btn_text.value = withTiming(scale_text, {duration: animation_duration})
      opacity_first_btn.value = withTiming(opacity, {duration: animation_duration})
    }
    else if (buttonType == btnTypes.second_btn) {
      scale_second_btn.value = withTiming(scale_btn, {duration: animation_duration})
      opacity_second_btn_text.value = withTiming(opacity, {duration: animation_duration})
    }
  }
  
  const btnPressIn = ({buttonType, val}:any) => {
    if (buttonType == btnTypes.first_btn) {
      opacity_first_btn.value = withTiming(val, {duration: animation_duration})
    }
    else if (buttonType == btnTypes.second_btn) {
      opacity_second_btn_text.value = withTiming(val, {duration: animation_duration})
    }
  }

  const btnPressEvent = ({buttonType}:any) => {
    if (buttonType == btnTypes.first_btn) {
      if (idScreen < 2) setIdScreen(idScreen + 1)
      else {
        dispatch(setIsHideSplashScreen(true))
      }
      // setIdScreen(idScreen < 2 ? idScreen + 1 : 0)

      btnAnimate({
        buttonType: btnTypes.first_btn, 
        scale_btn: 0.95, 
        scale_text: 0,
        opacity: 1,
      })
    }
    else if (buttonType == btnTypes.second_btn) {
      btnAnimate({
        buttonType: btnTypes.second_btn, 
        scale_btn: 0.95, 
        scale_text: -1,
        opacity: 1,
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setBtnsText({
        firstBtnText: SCREENS[idScreen].first_btn_text,
        secondBtnText: SCREENS[idScreen].second_btn_text,
      })
      
      btnAnimate({
        buttonType: btnTypes.first_btn, 
        scale_btn: 1, 
        scale_text: 1,
        opacity: 1,
      })
  
      btnAnimate({
        buttonType: btnTypes.second_btn, 
        scale_btn: 1, 
        scale_text: 1,
        opacity: 1,
      })
    }, animation_duration)
  }, [idScreen])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.first_btn, rBtnStyle[0]]}>
        <Pressable style={styles.fill}
          onPressIn={() => btnPressIn({buttonType: btnTypes.first_btn, val: 0.9})}
          onPress={() => btnPressEvent({buttonType: btnTypes.first_btn})} >
          <Animated.View style={[rBtnTextStyle[0]]}>
              <Text style={styles.first_btn_text}>
                {btnsText.firstBtnText}
              </Text>
          </Animated.View>
        </Pressable>
      </Animated.View>

      <Animated.View style={[styles.second_btn, rBtnStyle[1]]}>
        <Pressable style={styles.fill}
            onPressIn={() => btnPressIn({buttonType: btnTypes.second_btn, val: 0.8})}
            onPress={() => btnPressEvent({buttonType: btnTypes.second_btn})} >
            <Animated.View style={[rBtnTextStyle[1]]}>
              <Text style={styles.second_btn_text}>
                {btnsText.secondBtnText}
              </Text>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fill: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: '100%',
    height: '19%',
    alignItems: "stretch",
    justifyContent: "space-between",
    zIndex: -1
  },
  first_btn: {
    borderRadius: 20,
    height: '49%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black
  },
  first_btn_text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700'
  },
  second_btn: {
    borderRadius: 20,
    height: '49%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white
  },
  second_btn_text: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '500'
  },
});

export default ButtonsButtom;