import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import UnAuthScreen from "./UnAuthScreen";
import Toast from "react-native-toast-message";
const Navigation = () => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <UnAuthScreen />
      <Toast />
    </NavigationContainer>
  );
};

export default Navigation;
