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

  //these two function to toggle favorite list
  const addToFavorite = (item) => {
    dispatch(setFavoriteItem(item));
  };

  const removeFromFavoriteItem = (index) => {
    dispatch(removeFavoriteItem(index));
  };

  return (
    <>
      {/* image show in case the favorite list is empty  */}
      {!!!favorite.length && (
        <View style={styles.emptyContainer}>
          <Image source={FavoritesIcon} style={styles.image} />
        </View>
      )}

      {/* this to show the details for image that you pressed on */}
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

      {/* her to show all images list in redux favorite list*/}
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
});
export default Favorite;
