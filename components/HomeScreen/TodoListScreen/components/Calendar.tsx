import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../../../../colors";

interface PageProps {}

const Calendar: React.FC<PageProps> = () => {

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '40%',
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.extraLightGray,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
 
});

export default Calendar;