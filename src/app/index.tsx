import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";

import Routes from '../routes/index';

import { AuthProvider } from '../contexts/AuthContext'

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);


  return (

    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
