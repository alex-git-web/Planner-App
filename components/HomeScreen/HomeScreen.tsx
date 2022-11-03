import React from "react";
import { useNavigation } from '@react-navigation/native'
import { Dimensions, StyleSheet, Text, View, Image } from "react-native";
import { HomeScreenNavigationProp } from "../navigation/types";

interface PageProps {}

const { width: PAGE_WIDTH, height: PAGE_HEIGHT } = Dimensions.get("window");

const HomeScreen: React.FC<PageProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

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

export default HomeScreen;