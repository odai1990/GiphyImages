import { Button, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setFavoriteItem } from "../redux/FavoriteReducer";
const Navigation = (props) => {
  const isAuth = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();
  console.log("DSfdsfdsf", isAuth);
  return (
    <>
      <Text>{isAuth.length}</Text>
      <Button
        title="ffffff"
        onPress={() => dispatch(setFavoriteItem("ggggggg"))}
      />
    </>
  );
};

export default Navigation;
