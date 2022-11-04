import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View, Image, FlatList, TouchableOpacityBase, TouchableOpacity } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "../../../../colors";
import { animation_duration, bottom_tabs_height, PAGE_HEIGHT, todoCompleteStatus, todoItemType, todoList } from "../../../SplashScreen/others/constants";

interface PageProps {
 index: number,
 item: todoItemType,
}

const TodoItem: React.FC<PageProps> = ({index:itemIndex, item}) => {
  const { todo_list_item } = animation_duration
  const top_item = useSharedValue(PAGE_HEIGHT * 0.5)

  const rItemStyle = useAnimatedStyle(() => {
    return { 
      top: top_item.value
    }
  })
  

  useEffect(() => {
      let topV = 0

      if (itemIndex != 0) topV = 20
      else topV = 0

      top_item.value = withDelay(itemIndex * todo_list_item,
        withTiming(topV, { duration: todo_list_item })
      )
  }, [])

  return (
    <Animated.View style={[styles.container, rItemStyle, { 
      marginBottom: itemIndex == todoList.length - 1 ? bottom_tabs_height : 0,
      backgroundColor: item.status == todoCompleteStatus.done
      ? colors.lightGreen
      : colors.extraLightGray
    }]}>
      <TouchableOpacity style={styles.item_container}>
        <Text style={styles.item_status}>{item.status}</Text>
        <Text style={styles.item_title}>{item.title}</Text>
          { item.direction ? 
            <Text style={styles.item_direction}>{item.direction}</Text> 
            : null
          }
        <Text style={styles.item_date}>{item.eventDate}</Text>
     </TouchableOpacity>
    </Animated.View>
  )

};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 30,
  },
  item_container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 25
  },
  item_status: {
    fontSize: 18, 
    color: colors.green,
    fontWeight: '500',
    marginBottom: 13
  },
  item_title: {
    fontSize: 20, 
    color: colors.black,
    fontWeight: '900',
    marginBottom: 10
  },
  item_direction: {
    fontSize: 18, 
    color: colors.lightGrayDarker,
    fontWeight: '500',
    marginBottom: 10
  },
  item_date: {
    fontSize: 18, 
    color: colors.black,
    fontWeight: '400'
  },
});

export default TodoItem;