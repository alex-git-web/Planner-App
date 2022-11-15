import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";
import { colors } from "../../../../colors";
import { animation_duration, PAGE_HEIGHT, PAGE_WIDTH } from "../../../common/constants";
import { useAppSelector } from "../../../redux/hooks";
import { ActionBtns } from "./components/TodoElements/ActionBtns";
import { CalendarPart } from "./components/TodoElements/CalendarPart";
import { NotificationRepeat } from "./components/TodoElements/NotificationRepeat";
import { NotificationTime } from "./components/TodoElements/NotificationTime";
import { options } from "./components/TodoElements/others/constants";
import { TaskText } from "./components/TodoElements/TaskText";
import { TaskTime } from "./components/TodoElements/TaskTime";

interface PageProps {
  isShowModal: boolean,
  setIsShowModal: Function
}

export const TodoAddScreen: React.FC<PageProps> = ({
  isShowModal,
  setIsShowModal
}) => { 
  const { curSelectedDate } = useAppSelector(state => state.homeScreen)
  // Form elements data
  const [checkedDate, setCheckedDate] = useState<string>(new Date(curSelectedDate).toLocaleDateString('en-GB', options))
  const [taskText, onChangeTaskText] = useState<string>("")
  const [activeTaskTimeItemIdx, setActiveTaskTimeItemIdx] = useState<number>(0) 
  const [activeNotificationTimeItemIdx, setActiveNotificationTimeItemIdx] = useState<number>(0) 
  const [activeNotificationRepeatStateItemIdx, setActiveNotificationRepeatStateItemIdx] = useState<number>(0) 
  /*..............................................*/
  const { modal_add_todo:a_duration } = animation_duration
  const { isOpenModal } = useAppSelector(state => state.homeScreen)
  const backgroundColor_container = useSharedValue(0.5)
  const marginTop_content = useSharedValue(PAGE_HEIGHT)
  const width_content = useSharedValue(PAGE_WIDTH * 0.7)

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,0,0,${backgroundColor_container.value})`
    }
  })

  const rModalStyle = useAnimatedStyle(() => {
    return {
      marginTop: marginTop_content.value,
      width: width_content.value,
    }
  })

  useEffect(() => {
    if (isShowModal) {
      backgroundColor_container.value = withTiming(0.5, {duration: a_duration})
      marginTop_content.value = withTiming(PAGE_HEIGHT * 0.05, {duration: a_duration})
      width_content.value = withTiming(PAGE_WIDTH, {duration: a_duration})   
    }
  }, [isShowModal])

  useEffect(() => {
    if (!isOpenModal) {
      backgroundColor_container.value = withTiming(0, {duration: a_duration})
      marginTop_content.value = withTiming(PAGE_HEIGHT, {duration: a_duration})
      setTimeout(() => setIsShowModal(false), a_duration)
    }
  }, [isOpenModal])

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View style={[styles.modal, rModalStyle]}>
        <View style={styles.swipe_line}/>
        
        <Text style={styles.caption_text}>Add new task</Text>

        <View style={styles.content_view}>
          <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
            <CalendarPart checkedDate={checkedDate} setCheckedDate={setCheckedDate}/>
            <TaskText taskText={taskText} onChangeTaskText={onChangeTaskText}/>
            <TaskTime activeTaskTimeItemIdx={activeTaskTimeItemIdx} setActiveTaskTimeItemIdx={setActiveTaskTimeItemIdx}/>
            <NotificationTime activeNotificationTimeItemIdx={activeNotificationTimeItemIdx} setActiveNotificationTimeItemIdx={setActiveNotificationTimeItemIdx}/>
            <NotificationRepeat activeNotificationRepeatStateItemIdx={activeNotificationRepeatStateItemIdx} setActiveNotificationRepeatStateItemIdx={setActiveNotificationRepeatStateItemIdx}/>
          </ScrollView>
        </View>

        <ActionBtns 
          checkedDate={checkedDate}
          taskText={taskText}
          activeTaskTimeItemIdx={activeTaskTimeItemIdx}
          activeNotificationTimeItemIdx={activeNotificationTimeItemIdx}
          activeNotificationRepeatStateItemIdx={activeNotificationRepeatStateItemIdx}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 3,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: 'center',
  },
  modal: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT * 0.95,
    paddingHorizontal: '5%',
    paddingTop: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  content_view: {
    width: '100%',
    height: '73%',
  },
  swipe_line: {
    position: 'absolute',
    top: 10,
    backgroundColor: colors.lightGray,
    height: 3,
    width: '13%'
  },
  caption_text: {
    fontSize: 22,
    color: colors.black,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  }
});
