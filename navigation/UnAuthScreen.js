import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
const Stack = createNativeStackNavigator();
import loadable from "@loadable/component";
const AuthScreen = loadable(() => import("./AuthScreen"));
const Login = loadable(() => import("../screens/Login"));
// Here as you can see i have used loadable package to split code and make it fast
const UnAuthPages = () => {
  const isAuth = useSelector((state) => state.login.isAuth);
  //here i get isAuth value from redux to check if i render navigation for auth or to show login page
  //her i have used navigation stack
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
