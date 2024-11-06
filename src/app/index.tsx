import { useEffect } from "react";
import { setStatusBarStyle } from "expo-status-bar";

import Routes from '../routes/index'

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      setStatusBarStyle("dark");
    }, 0);
  }, []);


  return (

          <Routes/>
  );
}
