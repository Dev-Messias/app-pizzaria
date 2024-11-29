import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";
import { StatusBar } from "react-native";

import Routes from '../routes/index';

import { AuthProvider } from '../contexts/AuthContext'

export default function Index() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setStatusBarStyle("dark");
  //   }, 0);
  // }, []);


  return (

    <AuthProvider>
      <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
      <Routes />
    </AuthProvider>
  );
}
