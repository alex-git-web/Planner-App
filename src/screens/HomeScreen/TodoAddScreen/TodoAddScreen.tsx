import React from "react";
import { StyleSheet, View } from "react-native";
import { PAGE_HEIGHT, PAGE_WIDTH } from "../../../common/constants";

interface PageProps {

}

const TodoAddScreen: React.FC<PageProps> = () => {

  return (
    <View style={styles.container}>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
 
});

export default TodoAddScreen;