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
  const { todo_list_item:a_duration } = animation_duration
  const top_item = useSharedValue(PAGE_HEIGHT * 0.5)

  const scales_itemParts = {
    status: useSharedValue(0),
    title: useSharedValue(0),
    direction: useSharedValue(0),
    eventDate: useSharedValue(0),
  }
  const rItemStyle = useAnimatedStyle(() => {
    return { 
      top: top_item.value
    }
  })
  
  const rItemPartsStyle = {
    status: useAnimatedStyle(() => {
      return { 
        transform: [{scale: scales_itemParts.status.value}] 
      }
    }),
    title: useAnimatedStyle(() => {
      return { 
        transform: [{scale: scales_itemParts.title.value}] 
      }
    }),
    direction: useAnimatedStyle(() => {
      return { 
        transform: [{scale: scales_itemParts.direction.value}] 
      }
    }),
    eventDate: useAnimatedStyle(() => {
      return { 
        transform: [{scale: scales_itemParts.eventDate.value}] 
      }
    }),
  }
  
  const showItemAnimate = (delay:number) => {
    top_item.value = withDelay(delay,
      withTiming(itemIndex != 0 ? itemIndex * 20 : 0, { duration: a_duration })
    )
  }

  const showItemPartsAnimate = (delay:number) => {
    let duration = a_duration
    
    scales_itemParts.status.value = withDelay(delay * 1.1, // show "status"
      withTiming(1, { duration })
    )
    scales_itemParts.title.value = withDelay(delay * 1.2, // show "title"
      withTiming(1, { duration })
    )
    scales_itemParts.direction.value = withDelay(delay * 1.3, // show "direction"
      withTiming(1, { duration })
    )
    scales_itemParts.eventDate.value = withDelay(delay * 1.4, // show "eventDate"
      withTiming(1, { duration })
    )
  }

  useEffect(() => {
    showItemAnimate(itemIndex * a_duration)
    showItemPartsAnimate(itemIndex * a_duration)
  }, [])

  return (
    <Animated.View style={[styles.container, rItemStyle, { 
      marginBottom: itemIndex == todoList.length - 1 ? bottom_tabs_height * 1.7 : 0,
      backgroundColor: item.status == todoCompleteStatus.done
      ? colors.lightGreen
      : colors.extraLightGray
    }]}>
      <TouchableOpacity style={styles.item_container}>
        <Animated.View style={[styles.container, rItemPartsStyle.status]}>
          <Text style={styles.item_status}>{item.status}</Text>
        </Animated.View>

        <Animated.View style={[styles.container, rItemPartsStyle.title]}>
          <Text style={styles.item_title}>{item.title}</Text>
        </Animated.View>

        <Animated.View style={[styles.container, rItemPartsStyle.direction]}>
          { item.direction ? 
            <Text style={styles.item_direction}>{item.direction}</Text> 
            : null
          }
        </Animated.View>

        <Animated.View style={[styles.container, rItemPartsStyle.eventDate]}>
          <Text style={styles.item_event_date}>{item.eventDate}</Text>
        </Animated.View>
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
  item_event_date: {
    fontSize: 18, 
    color: colors.black,
    fontWeight: '400'
  },
});

export default TodoItem;