import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import CustomPagination from "../components/ui/CustomPagination";
import { endPoints } from "../api/endPoints";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/favoriteReducer";
import CustomModel from "../components/ui/CustomModel";
import CustomFlatList from "../components/ui/CustomFlatList";
import CustomInput from "../components/form/CustomInput";
import CustomTabs from "../components/ui/CustomTabs";
import colorSystem from "../styles/ColorSystem";
import SearchIcon from "../assets/images/giphy.png";

const Search = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [searchKey, setSearchKey] = useState("");
  const [Loading, setLoading] = useState(false);
  const favorite = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();
  const pageSize = 20;

  useEffect(() => {
    setCurrentPage(1);
    getImage();
  }, [currentTab]);

  useEffect(() => {
    getImage();
  }, [CurrentPage]);

  const getImage = async () => {
    searchKey && !data.length && setLoading(true);
    const config = {
      method: "get",
      url: `${
        currentTab == 0 ? endPoints.GifSearchUrl : endPoints.StickerSearchUrl
      }&offset=${(CurrentPage - 1) * pageSize}&q=${searchKey}`,
      headers: {},
    };
    const res = await axios(config);
    setTotalElements(res?.data?.pagination?.total_count || 0);
    setData(res?.data?.data || []);
    setLoading(false);
  };

  const addToFavorite = (item) => {
    dispatch(setFavoriteItem(item));
  };

  const removeFromFavoriteItem = (index) => {
    dispatch(removeFavoriteItem(index));
  };

  return (
    <>
      <CustomTabs
        tabsNames={["Gif", "Sticker"]}
        onPress={setCurrentTab}
        selectedTab={currentTab}
      />

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          borderRadius: 20,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <CustomInput
          id="Search"
          icon="search"
          placeholder="Search..."
          value={searchKey}
          onChangeText={setSearchKey}
          onSubmitEvent={() => getImage()}
        />
      </View>
      {Loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colorSystem.primary100} />
        </View>
      )}

      {!!!data.length && !Loading && (
        <View style={styles.emptyContainer}>
          <Image source={SearchIcon} style={styles.image} />
        </View>
      )}

      {!!selectedItem && (
        <CustomModel
          id="modalHome"
          isOpen={!!selectedItem}
          data={selectedItem}
          setIsOpen={() => setSelectedItem(null)}
          removeFromFavoriteItem={removeFromFavoriteItem}
          addToFavorite={addToFavorite}
          favorite={favorite}
        />
      )}
      {!!data.length && (
        <CustomFlatList
          id="flatListHome"
          data={data}
          removeFromFavoriteItem={removeFromFavoriteItem}
          addToFavorite={addToFavorite}
          favorite={favorite}
          setSelectedItem={setSelectedItem}
        />
      )}
      {!!data.length && (
        <View>
          <CustomPagination
            currentPage={CurrentPage}
            totalElement={totalElements}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: "20%",
    width: "40%",
    height: "45%",
    resizeMode: "stretch",
    opacity: 0.2,
  },
});

export default Search;
