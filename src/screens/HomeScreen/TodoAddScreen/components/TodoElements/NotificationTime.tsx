import React from "react";
import { items_notification_time } from "./others/constants";
import { ModalElement } from "./componets/ModalElement";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../../../../colors";

interface PageProps {
  activeNotificationTimeItemIdx:number,
  setActiveNotificationTimeItemIdx:Function,
}

export const NotificationTime: React.FC<PageProps> = ({
  activeNotificationTimeItemIdx, 
  setActiveNotificationTimeItemIdx
}) => {
 
  return <ModalElement 
    items={items_notification_time}
    caption={'Notification'}
    activeItemIdx={activeNotificationTimeItemIdx}
    setActiveItemIdx={setActiveNotificationTimeItemIdx}
    icon={
      <Ionicons name="notifications" size={20} color={colors.black} style={{marginRight: '5%'}} />
    }
  />
};
