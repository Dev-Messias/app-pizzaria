import { useEffect } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { setStatusBarStyle } from "expo-status-bar";

import SignIn from "./SignIn";


export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);


  return (
    <View>
      <SignIn/>
    </View>
  );
}
