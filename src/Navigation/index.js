import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {createDrawerNavigator} from '@react-navigation/drawer';

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeSreen";
import PrivateRoute from "../components/Routes/Private";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

import { useAuth } from "../context/auth";

// const NormalStack = () => {
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
//       {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
//       {/* <Stack.Screen name="User" component={UserScreen} options={{headerShown: true,}}/> */}
//       {/* <Stack.Screen name="SignIn" component={LogInStack}/> */}
      
//     </Stack.Navigator>
// }

const LoggedInStack = ()=>{
  return(
   <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SignIn" component={LogInStack} />
    </Stack.Navigator> 
  )
    
}
const LogInStack = ()=>{
  return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )

  }

const Navigation =  ()=>  {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  async function getData() {
    const data = await AsyncStorage.getItem('isLoggedIn');
    // console.log(data, 'at app.js');
    setIsLoggedIn(data);
  }

  useEffect(() => {
    getData();
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 900);
  }, [isLoggedIn]);

  
  return (
    <>
      <NavigationContainer>
        {isLoggedIn ?(
          <LoggedInStack/>
          ):(
         <LogInStack/>
         
        )}
       
      </NavigationContainer>
    </>
  );
};


    


export default Navigation;
