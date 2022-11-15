import React from "react";
import { StyleSheet, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import { colors } from "../../../../../../colors";
import { PAGE_HEIGHT } from "../../../../../common/constants";
import { ModalElement } from "./componets/ModalElement";
import { items_repeat_state } from "./others/constants";

interface PageProps {
  activeNotificationRepeatStateItemIdx:number,
  setActiveNotificationRepeatStateItemIdx:Function
}

export const NotificationRepeat: React.FC<PageProps> = ({
  activeNotificationRepeatStateItemIdx,
  setActiveNotificationRepeatStateItemIdx
}) => {
  
  return (
    <View style={styles.container}>
      <ModalElement 
          items={items_repeat_state}
          caption={'Repeat'}
          activeItemIdx={activeNotificationRepeatStateItemIdx}
          setActiveItemIdx={setActiveNotificationRepeatStateItemIdx}
          icon={
            <Feather name="repeat" size={20} color={colors.black} style={{marginRight: '5%'}} />
          }
        />
    </View>
  ) 
};

const styles = StyleSheet.create({
  container: {
    marginBottom: '10%'
  }
})