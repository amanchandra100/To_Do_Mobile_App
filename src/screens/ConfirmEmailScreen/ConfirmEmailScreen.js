import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import Custominput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import {useNavigation} from '@react-navigation/native'
import { useForm} from "react-hook-form";

const SignUpScreen = () => {

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onConfirmPressed = () => {
    navigation.navigate('HomeScreen')
  };
  
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };
  const onResendCodePressed = () => {
    console.warn("onResendCodePressed");
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.root}>

      <Text style={styles.title} >Confirm your email</Text>

      <Custominput
        name="code"
        placeholder="Enter Confirmation Code"
        control={control}
        rules={{
          required: { value: true, message: "Code is required" },
          minLength: {
            value: 6,
            message: "Code should be at least 6 character long",
          },
          maxLength: {
            value: 6,
            message: "Code should be max 6 character long",
          },
        }}
      />
      

      <CustomButton text="Confirm" onPress={handleSubmit(onConfirmPressed)} type="PRIMARY" />
      
    
      <CustomButton
        text="Resend Code"
        onPress={onResendCodePressed}
        type="SECONDARY"
        // bgColor="#e3e3e3"
        // fgColor="#363636"
      />
      <CustomButton
        text="Have an account? Sign In"
        onPress={onSignInPressed}
        type="TERTIARY"
        // bgColor="#e3e3e3"
        // fgColor="#363636"
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'#051C60',
    margin:10,
  },
  text:{
  color:'gray',
  marginVertical: 10,
  },
  links:{
    color:'blue'
  }
});

export default SignUpScreen;
