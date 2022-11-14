import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../../../../../../../colors";
import { HorizontalDropdown } from "./HorizontalDropdown";
import { DropdownArrow } from "./DropdownArrow";
import { PAGE_HEIGHT } from "../../../../../../common/constants";

interface PageProps {
  items: Array<string>,
  caption: string,
  icon: any
}

export const ModalElement: React.FC<PageProps> = ({
  items,
  caption,
  icon
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false) 
  const [activeItemIdx, setActiveItemIdx] = useState<number>(0) 

  return (
    <View style={styles.container}>
      <View style={styles.wrappers}>
        { icon }
        <Text style={styles.caption_text}>{caption}</Text>
      </View>

      <View style={styles.wrappers}>
        <TouchableOpacity onPress={() => setIsDropdownOpen(state=> !state)}>
          <Text style={styles.time_text}>{items[activeItemIdx]}</Text>
        </TouchableOpacity>

        <DropdownArrow 
         isDropdownOpen={isDropdownOpen}
         setIsDropdownOpen={setIsDropdownOpen}
        />
      </View>

      <HorizontalDropdown 
        items={items} 
        activeItemIdx={activeItemIdx}
        setActiveItemIdx={setActiveItemIdx}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: PAGE_HEIGHT * 0.12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: colors.extraLightGray_1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  wrappers: {
    paddingVertical: 20,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  caption_text: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '600',
  },
  time_text: {
    color: colors.black,
    fontSize: 17,
    fontWeight: '700',
  },
});
