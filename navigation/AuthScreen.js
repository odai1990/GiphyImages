import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, Text, View } from "react-native";
import Logo from "../assets/images/logo.png";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import colorSystem from "../styles/ColorSystem";
import { logoutAction } from "../redux/LoginReducer";
import { useDispatch } from "react-redux";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Search from "../screens/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createBottomTabNavigator();

const AuthScreen = () => {
  //Here make some global option to all auth navigation like styles,icon and also logout function.
  //her i sue different navigation called tabs
  const dispatch = useDispatch();
  const optionsTabs = (iconName) => {
    return {
      headerTitle: "",
      headerTitleAlign: "center",
      headerTitle: () => <Image source={Logo} style={styles.image} />,
      headerRight: () => (
        <AntDesign
          name="logout"
          style={{ fontSize: 20, paddingRight: 20 }}
          onPress={() => {
            // her i call logout from app and delete storage
            dispatch(logoutAction());
            AsyncStorage.removeItem("Authentication");
          }}
        />
      ),
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name={iconName} color={color} size={size} />
      ),
      tabBarLabel: "",
    };
  };

  const optionContainer = {
    tabBarActiveTintColor: colorSystem.primary100,
  };

  return (
    <Tab.Navigator screenOptions={optionContainer}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => optionsTabs("home")}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={() => optionsTabs("favorite-border")}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={() => optionsTabs("search")}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 20,
  },
});
export default AuthScreen;
