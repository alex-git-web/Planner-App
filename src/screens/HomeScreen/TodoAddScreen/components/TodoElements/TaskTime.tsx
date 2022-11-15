import React from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons' 
import { items_task_time } from "./others/constants";
import { ModalElement } from "./componets/ModalElement";
import { colors } from "../../../../../../colors";

interface PageProps {
  activeTaskTimeItemIdx:number
  setActiveTaskTimeItemIdx:Function
}

export const TaskTime: React.FC<PageProps> = ({
  activeTaskTimeItemIdx,
  setActiveTaskTimeItemIdx
}) => {
  
  return <ModalElement 
    items={items_task_time}
    caption={'Task Time'}
    activeItemIdx={activeTaskTimeItemIdx}
    setActiveItemIdx={setActiveTaskTimeItemIdx}
    icon={
      <MaterialCommunityIcons name="timer" size={20} color={colors.black} style={{marginRight: '5%'}} />
    }
  />
};
