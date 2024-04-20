/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"; 
import { StyleSheet, View, Text, SafeAreaView, TextInput } from "react-native";
import Navigation from "./src/Navigation";
import { AuthProvider } from "./src/context/auth";

const App = () => {
  return (
    <SafeAreaView style={styles.root}>

      {/* <Text style={styles.sectionContainer}>hello world</Text> */}
      {/* <SignInScreen/> */}
      {/* <SignUpScreen /> */}
      {/* <ConfirmEmailScreen/> */}
      {/* <ForgetPasswordScreen/> */}
      {/* <NewPasswordScreen/> */}
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex:1,
  },
  sectionContainer: {
    marginTop: 92,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default App;
