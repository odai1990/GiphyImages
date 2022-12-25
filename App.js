import Navigation from "./navigation/Navigation";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export default function App() {
  //THis is the start point ....
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
