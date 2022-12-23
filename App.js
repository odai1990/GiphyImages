import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { endPoints } from "./api/EndPoints";
import Navigation from "./navigation/Navigation";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
