import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../../../colors";
import { setA } from "../../../../redux/slices/appState";
import {PAGE_WIDTH, } from "../../../SplashScreen/others/constants";
import TodoItem from "./TodoItem";

interface PageProps {}

const AddTodoBtn: React.FC<PageProps> = () => { 
  const dispatch = useDispatch()
 
  return (
    <TouchableOpacity style={styles.container} onPress={() => dispatch(setA(Date.now()))}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: PAGE_WIDTH * 0.17,
    height: PAGE_WIDTH * 0.17,
    borderRadius: PAGE_WIDTH * 0.17,
    position: 'absolute',
    zIndex: 3,
    bottom: PAGE_WIDTH * 0.1,
    right: PAGE_WIDTH * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {
        width: 0,
        height: 9,
    },
    shadowOpacity: 0.8,
    shadowRadius: PAGE_WIDTH * 0.2,
    elevation: 18,
    backgroundColor: colors.black
  },
  plus: {
    fontSize: 33, 
    color: colors.white,
    fontWeight: '400',
  }
});

export default AddTodoBtn;