import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from "../../../../../../../colors";
import { animation_duration } from "../../../../../../common/constants";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

interface PageProps {
  isDropdownOpen: boolean,
  setIsDropdownOpen: Function
}

export const DropdownArrow: React.FC<PageProps> = ({
  isDropdownOpen,
  setIsDropdownOpen
}) => {
  const { home_screen_elements: a_duration } = animation_duration

  const rotateArrow = useSharedValue(0)

  const rArrowRightStyle = useAnimatedStyle(() => {
      return {
          transform: [
            { rotate: `${rotateArrow.value}deg` }
          ]
      }
  })

  useEffect(() => {
    if (isDropdownOpen) rotateArrow.value = withDelay(a_duration / 2, withTiming(180, {duration: a_duration}))
    else rotateArrow.value = withDelay(a_duration / 2, withTiming(0, {duration: a_duration}))
  }, [isDropdownOpen])

  return (
    <Animated.View style={[rArrowRightStyle]}>
        <TouchableOpacity onPress={() => setIsDropdownOpen((state: boolean) => !state)}>
            <AntDesign name="right" size={20} color={colors.lightGray} style={{marginLeft: '5%'}} />
        </TouchableOpacity>
    </Animated.View>
  );
};
