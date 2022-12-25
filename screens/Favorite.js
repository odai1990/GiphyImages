import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/favoriteReducer";
import CustomModel from "../components/ui/CustomModel";
import CustomFlatList from "../components/ui/CustomFlatList";
import FavoritesIcon from "../assets/images/favorites.png";
import { Image, StyleSheet, Text, View } from "react-native";

const Favorite = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const favorite = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();

  const addToFavorite = (item) => {
    dispatch(setFavoriteItem(item));
  };

  const removeFromFavoriteItem = (index) => {
    dispatch(removeFavoriteItem(index));
  };

  return (
    <>
      {(!favorite.length && (
        <View style={styles.emptyContainer}>
          <Image source={FavoritesIcon} style={styles.image} />
          {/* <Text style={styles.text}>Nothing to Show</Text> */}
        </View>
      )) ||
        null}
      {!!selectedItem && (
        <CustomModel
          id="modalFavorite"
          isOpen={!!selectedItem}
          data={selectedItem}
          setIsOpen={() => setSelectedItem(null)}
          removeFromFavoriteItem={removeFromFavoriteItem}
          favorite={favorite}
        />
      )}
      <CustomFlatList
        id="flatListFavorite"
        data={favorite}
        removeFromFavoriteItem={removeFromFavoriteItem}
        favorite={favorite}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "40%", height: "40%", resizeMode: "stretch" },
  // text: {
  //   fontSize: 18,
  //   marginTop: 10,
  //   fontWeight: "bold",
  // },
});
export default Favorite;
