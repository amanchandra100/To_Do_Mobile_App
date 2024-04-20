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


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


const ForgotPasswordScreen = () => {

  const navigation =useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSendPressed = () => {
    navigation.navigate('NewPassword')
  };
  
  const onSignInPressed = () => {
    navigation.navigate('SignIn')
  };


  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.root}>
      {/* <Image
        source={LOGO}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      /> */}

      <Text style={styles.title} >Reset your password</Text>

      <Custominput
        name="email"
        placeholder="Email"
        control={control}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {value: EMAIL_REGEX, message:"Email is Invalid"}
        }}
      />
      

      <CustomButton text="Send" onPress={handleSubmit(onSendPressed)} type="PRIMARY" />
      
    
      <CustomButton
        text="Back to Sign In"
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

export default ForgotPasswordScreen;
