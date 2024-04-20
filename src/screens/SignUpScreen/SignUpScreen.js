import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import Custominput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
// import toast from "react-hot-toast";
import axios from "axios"
import config from "../../../config"


const host = `${config.HOST2}`;




const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    getValues
  } = useForm();
  const pass= watch('password')

  const {username,email,password}= getValues();

  const onRegisterPressed = async (e) => {
    try {
      const res = await axios.post(`${host}/api/v1/auth/register`, {
        username,
        email,
        password,
      });
      
      if (res && res.data.success) {
        alert(res.data.message);
        navigation.navigate("SignIn");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
    
  };
  const onTermOfUsePressed = () => {
    console.warn("onTermOfUsePressed");
  };
  const onPrivacyPolicyPressed = () => {
    console.warn("onPrivacyPolicyPressed");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <Custominput
          name="username"
          placeholder="Username"
          control={control}
          rules={{
            required: { value: true, message: "Username is required" },
            minLength: {
              value: 3,
              message: "Username should be minimum 3 character",
            },
            maxLength: {
              value: 24,
              message: "Username should be max 24 character long",
            },
          }}
        />
        <Custominput
          name="email"
          placeholder="Email"
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
            pattern: {value: EMAIL_REGEX, message:"Email is Invalid"}
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

        <Custominput
          name="repeatPassword"
          placeholder="Repeat Password"
          secureTextEntry
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
            validate: value => value == pass || 'Password do not Match',
            minLength: {
              value: 6,
              message: "Password should be minimum 6 character",
            },
            
          }}
        />

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
          type="PRIMARY"
        />

        <Text style={styles.text}>
          By registering, you conform that you accept our
          <Text style={styles.links} onPress={onTermOfUsePressed}>
            {" "}
            Terms of Use{" "}
          </Text>{" "}
          and{"  "}
          <Text style={styles.links} onPress={onPrivacyPolicyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButton /> */}

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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  links: {
    color: "blue",
  },
});

export default SignUpScreen;
