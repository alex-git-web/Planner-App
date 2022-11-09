import React from "react";
import { StyleSheet, View, } from "react-native";
import { SCREENS } from "../../../others/constants";
import Line from "./components/Line";

interface PageProps {
  idScreen: number,
  animation_duration: number
}

const ScreenIndicator: React.FC<PageProps> = ({
  idScreen,
  animation_duration
}) => {

  return (
    <View style={styles.container}>
        {SCREENS.map((_, index) => {
          return (
            <Line
              key={index.toString()}
              index={index}
              activeLineIndex={idScreen}
              animation_duration={animation_duration}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '3%',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: -1
  },
 
});

export default ScreenIndicator;