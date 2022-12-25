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
  //here i have used deffrent state to manage locak logic like page number tab index ...etc
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

  //this useEffect to recall function axios to get the next page when the page number changed
  useEffect(() => {
    getImage();
  }, [CurrentPage]);

  // this useEffect to recall the axios same as above useEffect but to retune the page to default ... when change tabs
  useEffect(() => {
    setCurrentPage(1);
    getImage();
  }, [currentTab]);

  // this function for call endpoint trending
  const getImage = async () => {
    //here i change the end point for only search between gif and Sticker depend on tabs index
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

  // these tow function to add and delete an image from favorite list from redux
  const addToFavorite = (item) => {
    dispatch(setFavoriteItem(item));
  };

  const removeFromFavoriteItem = (index) => {
    dispatch(removeFavoriteItem(index));
  };

  return (
    <>
      {/* here the tabs  */}
      <CustomTabs
        tabsNames={["Gif", "Sticker"]}
        onPress={setCurrentTab}
        selectedTab={currentTab}
      />

      {/* this is the search box for searching on api */}
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

      {/* here the loader in fetching data from axios, in case loader false loader will fired  */}
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

      {/* this is the model for details image , and this not show until you press on an image and fill state  selectedItem will show */}
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

      {/* this is a flat list that return the cards after get data from api */}
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

      {/* this pagination that depend on some state and axios  */}
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
