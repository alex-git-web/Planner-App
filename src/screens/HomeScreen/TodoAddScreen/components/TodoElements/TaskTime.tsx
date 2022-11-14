import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import { items_task_time } from "./others/constants";
import { ModalElement } from "./componets/ModalElement";
import { colors } from "../../../../../../colors";

interface PageProps {}

export const TaskTime: React.FC<PageProps> = () => {
  
  return <ModalElement 
    items={items_task_time}
    caption={'Task Time'}
    icon={
      <MaterialCommunityIcons name="timer" size={20} color={colors.black} style={{marginRight: '5%'}} />
    }
  />
};
