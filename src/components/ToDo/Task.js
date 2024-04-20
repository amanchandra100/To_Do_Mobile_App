import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  CheckBox,
} from "react-native";
// import CheckBox from '@react-native-community/checkbox';

const Task = (props) => {
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>

        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}><Text style={styles.text1}>❌</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#120B9E",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 22,
    height: 22,
    // borderColor: "red",
    // borderWidth: 2,
    borderRadius: 5,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    paddingHorizontal: '20',
  },
  text1:{
    alignSelf:"center",
    color:"red",
  }
});

export default Task;
