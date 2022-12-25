import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import UnAuthScreen from "./UnAuthScreen";
import Toast from "react-native-toast-message";
const Navigation = () => {
  // Here I import status bark, unAuthScreen that hold all navigation, tosat is notification manager .. to sho notification on all app
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <UnAuthScreen />
      <Toast />
    </NavigationContainer>
  );
};

export default Navigation;
