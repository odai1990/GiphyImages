import axios from "axios";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import CustomPagination from "../components/ui/CustomPagination";
import { endPoints } from "../api/EndPoints";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/FavoriteReducer";
import CustomModel from "../components/ui/CustomModel";
import CustomFlatList from "../components/ui/CustomFlatList";
import CustomTabs from "../components/ui/CustomTabs";
import colorSystem from "../styles/ColorSystem";

const Home = () => {
  //here i have used deffrent state to manage locak logic like page number tab index ...etc
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
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
    //here i change the end point for only trending between gif and Sticker depend on tabs index
    const config = {
      method: "get",
      url: `${
        currentTab == 0
          ? endPoints.GifTrendingUrl
          : endPoints.StickerTrendingUrl
      }&offset=${(CurrentPage - 1) * pageSize}`,
    };

    const res = await axios(config);
    setTotalElements(res?.data?.pagination?.total_count || 0);
    setData(res?.data?.data || []);
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

      {/* here the loader in fetching data from axios, in case data length 0 loader will fired  */}
      {!!!data.length && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colorSystem.primary100} />
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
      <View>
        <CustomPagination
          currentPage={CurrentPage}
          totalElement={totalElements}
          pageSize={pageSize}
          setCurrentPage={setCurrentPage}
        />
      </View>
    </>
  );
};

export default Home;
