import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container, 
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}   
      ]}>
      <Text 
      style={[
        styles.text, 
        styles[`text_${type}`],
        fgColor ? {color:fgColor} : {}
      ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    padding: 15,
    marginVertical: 5,

    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "orange",
  },
  container_SECONDARY: {
    borderColor: "orange",
    borderWidth:1
  },
  container_TERTIARY: {
    // backgroundColor: 'gray',
  },
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_PRIMARY: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY: {
    fontWeight: "bold",
    color: "gray",
  },
  text_TERTIARY: {
    fontWeight: "bold",
    color: "gray",
  },
});

export default CustomButton;
