import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../../../colors";
import { animation_duration } from "../../../../../../common/constants";

interface PageProps {
    items: Array<string>,
    activeItemIdx: number,
    setActiveItemIdx: Function,
    isDropdownOpen: boolean,
    setIsDropdownOpen: Function,
}

export const HorizontalDropdown: React.FC<PageProps> = ({
    items,
    activeItemIdx,
    setActiveItemIdx,
    isDropdownOpen,
    setIsDropdownOpen
}) => {
    const { home_screen_elements: a_duration } = animation_duration
    const opacityContainer = useSharedValue(0)
    const widthContainer = useSharedValue(0)

    const rContainerStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityContainer.value,
            width: `${widthContainer.value}%`,
        }
    })

    const select = (itemIndex:number) => {
        setIsDropdownOpen(false)
        setActiveItemIdx(itemIndex)
    }

    useEffect(() => {
        if (isDropdownOpen) {
            widthContainer.value = withTiming(91, {duration: a_duration})
            opacityContainer.value = withDelay(
                a_duration,
                withTiming(1, {duration: a_duration})
            )
        }
        else {
            widthContainer.value =  withDelay(
                a_duration, 
                withTiming(0, {duration: a_duration})
            )
            opacityContainer.value = withDelay(
                a_duration,
                withTiming(0, {duration: a_duration})
            )
        }
      }, [isDropdownOpen])

    return (
        <Animated.View style={[styles.container, rContainerStyle]}>
            <Animated.View style={[styles.content]}>
                <ScrollView style={{flex: 1}} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        items.map((item, index) => {
                            return (
                                <TouchableOpacity 
                                    key={index}
                                    style={[styles.item, 
                                        index != items.length - 1
                                        ? { borderRightWidth: 1 }
                                        : null
                                    ]} 
                                    onPress={() => select(index)}
                                >
                                    <Text 
                                        style={[styles.item_text, 
                                        index === activeItemIdx ? { color: colors.black } : null
                                    ]}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    position: 'absolute',
    zIndex: 3,
    top: '10%',
    right: '15%',
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
  },
  item: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.lightGray
  },
  item_text: {
    color: colors.lighGray,
    fontSize: 17,
    fontWeight: '500',
  }
});
