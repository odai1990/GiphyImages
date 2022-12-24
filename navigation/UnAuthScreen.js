import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./AuthScreen";
import Login from "../screens/Login";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();

const UnAuthPages = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  return (
    <Stack.Navigator>
      {!isAuth && (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )}
      {isAuth && (
        <Stack.Screen
          name="landingPage"
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default UnAuthPages;
