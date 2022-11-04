import React from "react";
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { PAGE_HEIGHT, PAGE_WIDTH } from "../../SplashScreen/others/constants";

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