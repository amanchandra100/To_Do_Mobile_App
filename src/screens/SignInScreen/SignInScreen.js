import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
  BackHandler  
} from "react-native";
import React, { useState } from "react";
import MyLogo from "../../../assets/images/MyLogo.png";
import Custominput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import  axios  from "axios";
import  {useAuth}  from "../../context/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native"

import config from "../../../config"


const host = `${config.HOST2}`;


const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [auth,setAuth] = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm();

  const {username,password}= getValues();


  const handleBackPress = () => {
    Alert.alert("Exit App", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Exit",
        onPress: () => BackHandler.exitApp(),
      },
    ]);
    return true;
  };

  //For handle backbuttonn problem
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        
        BackHandler.removeEventListener("hardwareBackPress",handleBackPress);
      }
    
    }))



  // form function
  const onSignInPressed = async(e) => {
    try {
      const res = await axios.post(`${host}/api/v1/auth/login`, {
        username,
        password,
      });
      // console.warn("Click")
      if (res && res.data.success) {
        // console.warn(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        AsyncStorage.setItem("auth", JSON.stringify(res.data));
        AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
        navigation.navigate("HomeScreen");
        reset();
        Alert.alert(res.data.message)
      } else {
        Alert.alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("User not Found");
    }
  };

  

  const onForgetPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
      <View style={styles.root}>
        <Image
          source={MyLogo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        {/* <Text>SignUpScreen</Text> */}

        <Custominput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 3,
              message: "Username should be at least 3 character long",
            },
            maxLength: {
              value: 24,
              message: "Username should be max 24 character long",
            },
          }}
        />
        <Custominput
          name="password"
          placeholder="Password"
          secureTextEntry
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
            minLength: {
              value: 6,
              message: "Password should be minimum 6 character",
            },
          }}
        />

        <CustomButton
          text="Sign In"
          onPress={handleSubmit(onSignInPressed)}
          type="PRIMARY"
        />
        <CustomButton
          text="Forget Password"
          onPress={onForgetPasswordPressed}
          type="TERTIARY"
        />

        {/* <SocialSignInButton /> */}

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
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
  logo: {
    width: "60%",
    height: 40,
  },
});

export default SignInScreen;
