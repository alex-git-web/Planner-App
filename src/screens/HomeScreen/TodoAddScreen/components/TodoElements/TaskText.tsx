import React, {useState} from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { colors } from "../../../../../../colors";

interface PageProps {
  taskText:string, 
  onChangeTaskText:any

}

export const TaskText: React.FC<PageProps> = ({
  taskText, 
  onChangeTaskText
}) => {

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.text_input}
        onChangeText={onChangeTaskText}
        value={taskText}
        placeholder="Write a task"
        keyboardType="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '20%',
    backgroundColor: colors.extraLightGray_1,
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  text_input: {
    color: colors.lighGray,
    fontSize: 17,
    fontWeight: '500'
  }
});
