import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../../../../../../../colors';

interface DotProps {
  index: number;
  activeLineIndex: number;
  animation_duration: number
}

const Line: React.FC<DotProps> = ({ 
  activeLineIndex, 
  index, 
  animation_duration 
}) => {
  const rLineStyle = useAnimatedStyle(() => {
    const isActive = activeLineIndex === index;
    return {
      backgroundColor: withTiming(isActive ? `${colors.black}` : `${colors.lightGray}`, {
        duration: animation_duration,
      }),
      width: withTiming(isActive ? `${30}%` : `${18}%`, {
        duration: animation_duration,
      }),
    };
  });

  return <Animated.View style={[styles.line, rLineStyle]} />;
};

const styles = StyleSheet.create({
  line: {
    height: 3,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

export default Line;