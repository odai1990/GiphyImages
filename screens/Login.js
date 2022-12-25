import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CustomButton from "../components/form/CustomButton";
import CustomInput from "../components/form/CustomInput";
import colorSystem from "../styles/ColorSystem";
import { EMAIL, PASSWORD } from "@env";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/loginReducer";
import showToast from "../utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getCheckAuth();
  }, []);

  const getCheckAuth = async () => {
    const auth = await AsyncStorage.getItem("Authentication");
    if (JSON.parse(auth)?.Authentication) dispatch(loginAction());
  };

  const checkLogin = () => {
    if (EMAIL == email?.toLocaleLowerCase() && PASSWORD == password) {
      const Authentication = JSON.stringify({ Authentication: true });
      AsyncStorage.setItem("Authentication", Authentication);
      dispatch(loginAction());
    } else {
      showToast("error", "Error", "Incorrect Email or Password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <CustomInput
          id="email"
          label="Email"
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
        />
        <CustomInput
          id="password"
          label="Password"
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
        />
        <CustomButton
          id="login"
          name="Login"
          onPress={checkLogin}
          disabled={!(email && password)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "80%",
    minHeight: "30%",
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    borderRadius: 8,
    padding: 30,
    backgroundColor: colorSystem.primary100,
  },
});
export default Login;
