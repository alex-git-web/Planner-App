import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { colors } from "../../../../../../../colors";
import { animation_duration, PAGE_WIDTH } from "../../../../../../common/constants";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import { todoCompleteStatus, TodoEventDataType, TodoItemType } from "../../../../others/constants";
import { setData } from "../../../../../../redux/slices/homeScreenState";

interface PageProps {
 index: number,
 item_event_date: string,
 item_event_data: TodoEventDataType,
 deleteItem: Function
}

const { todo_list_item:a_duration } = animation_duration

const TodoItem: React.FC<PageProps> = ({
  index:itemIndex, 
  item_event_date,
  item_event_data,
  deleteItem
}) => {
  const dispatch = useAppDispatch()
  const { isRenderTodoList } = useAppSelector(state => state.homeScreen)
  const { isMainAppPartLoaded } = useAppSelector(state => state.appConfigure)
  const top_item = useSharedValue(100)
  const opacity_item = useSharedValue(0)

  const scales_itemParts = {
    status: useSharedValue(0),
    title: useSharedValue(0),
    direction: useSharedValue(0),
    eventDate: useSharedValue(0),
  }
  const rItemStyle = useAnimatedStyle(() => {
    return { 
      top: top_item.value,
      opacity: opacity_item.value,
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
      withTiming(0, { duration: a_duration })
    )
    opacity_item.value = withDelay(delay,
      withTiming(1, { duration: a_duration })
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

  const deleteBtnPress = async () => {
    const res = await deleteItem({
      event_date: item_event_date, 
      event_data: [item_event_data]
    })

    if (res) {
      opacity_item.value = withTiming(0, { duration: a_duration })
      setTimeout(() => {
        dispatch(setData({
          key: 'isRenderTodoList',
          value: !isRenderTodoList
        }))
      }, a_duration)
    }
  }

  useEffect(() => {
    if (isMainAppPartLoaded) {
      showItemAnimate(a_duration * itemIndex) // * itemIndex
      showItemPartsAnimate((a_duration) * 1.5 * itemIndex) // * itemIndex
    }
  }, [isMainAppPartLoaded])

  return (
    <Animated.View style={[styles.container, rItemStyle, { 
      backgroundColor: item_event_data.status == todoCompleteStatus.done
      ? colors.lightGreen
      : colors.extraLightGray
    }]}>
      <TouchableOpacity style={styles.item_container}>
        <Animated.View style={[rItemPartsStyle.status]}>
          <Text style={styles.item_status}>{item_event_data.status}</Text>
        </Animated.View>

        <Animated.View style={[rItemPartsStyle.title]}>
          <Text style={styles.item_title}>{item_event_data.title}</Text>
        </Animated.View>

        <Animated.View style={[rItemPartsStyle.direction]}>
          { item_event_data.direction ? 
            <Text style={styles.item_direction}>{item_event_data.direction}</Text> 
            : null
          }
        </Animated.View>

        <Animated.View style={[rItemPartsStyle.eventDate]}>
          <Text style={styles.item_event_date}>{item_event_data.eventTime}</Text>
        </Animated.View>

        <TouchableOpacity style={styles.delete_btn} activeOpacity={0.7} 
          onPress={() => deleteBtnPress() }>
          <MaterialIcons name="delete-outline" size={24} color={colors.lightGrayDarker} />
        </TouchableOpacity>
     </TouchableOpacity>
    </Animated.View>
  )

};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 30,
    marginBottom: 20
  },
  item_container: {
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 25
  },
  item_status: {
    fontSize: 15, 
    color: colors.green,
    fontWeight: '500',
    marginBottom: 13
  },
  item_title: {
    fontSize: 20, 
    color: colors.black,
    fontWeight: '900',
    marginBottom: 13
  },
  item_direction: {
    fontSize: 15, 
    color: colors.lightGrayDarker,
    fontWeight: '500',
    marginBottom: 13
  },
  item_event_date: {
    fontSize: 17, 
    color: colors.black,
    fontWeight: '400'
  },
  delete_btn: {
    position: 'absolute',
    zIndex: 3,
    right: 10,
    top: 10,
    width: PAGE_WIDTH * 0.13,
    height: PAGE_WIDTH * 0.13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: PAGE_WIDTH * 0.13,
  }
});

export default TodoItem;