import {
  View,
  Text,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "../../components/ToDo/Task";

const Home = () => {
  // const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [auth, setAuth] = useAuth();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    AsyncStorage.setItem("taskItems",  JSON.stringify([...taskItems,task]));
    setTask(null);
    // console.log(taskItems)
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    AsyncStorage.setItem("taskItems",JSON.stringify(itemsCopy));
    
  };
  async function getData() {
    const data1 = await AsyncStorage.getItem('taskItems');
    const data=JSON.parse(data1)
    setTaskItems(data);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // form function
  const onSignOutPressed = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    AsyncStorage.setItem("auth", "");
    AsyncStorage.setItem("isLoggedIn", "");
    Alert.alert("Logout Successfully");
    navigation.navigate("SignIn");
  };

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

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    })
  );

  useEffect (() => {
    getData();
  },[]);

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
       
          <View style={styles.tasksWrapper}>
            <View style={styles.view1}>
              <Text style={styles.sectionTitle}>Today's tasks</Text>
              <Pressable
                onPress={handleSubmit(onSignOutPressed)}
                style={styles.signout}
              >
                <Text style={styles.text}>Sign Out</Text>
              </Pressable>
            </View>
            <View style={styles.items}>
             
              {taskItems?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => completeTask(index)}
                  >
                    <Task text={item} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={task}
            onChangeText={(text) => setTask(text)}
            required
          />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
      <View style={styles.lastview}>
          <Text
            style={styles.lasttext}>
            Made By Aman Chandra😊
          </Text>
        </View>

      {/* <CustomButton
        text="Sign Out"
        onPress={handleSubmit(onSignOutPressed)}
        type="PRIMARY"
      /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 20,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
  },
  signout: {
    width: 40,
    backgroundColor: "#FC4848",
    // shadowColor:"black",
    // shadowOffset: {width: -4, height: 4},
    // shadowOpacity: 1,
    // shadowRadius: 3,
    borderRadius: 4,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 13,
    fontWeight:"900",
    textAlign: "center",
    color:"white"
  },
  view1: {
    // display: "flex",
    flexDirection:"row",
    justifyContent:"space-between",
    width:380,
  },
  lasttext: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
  },
  lasttextdark: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '900',
    color: "white",
  },
  lastview: {
    paddingVertical: 6,
  },
});

export default Home;
