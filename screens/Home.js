import axios from "axios";
import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import CustomPagination from "../components/ui/CustomPagination";
import { endPoints } from "../api/endPoints";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/favoriteReducer";
import CustomModel from "../components/ui/CustomModel";
import CustomFlatList from "../components/ui/CustomFlatList";
import CustomTabs from "../components/ui/CustomTabs";
import colorSystem from "../styles/ColorSystem";

const Home = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const favorite = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();

  const pageSize = 20;

  useEffect(() => {
    getImage();
  }, [CurrentPage]);

  useEffect(() => {
    setCurrentPage(1);
    getImage();
  }, [currentTab]);

  const getImage = async () => {
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
      {!!!data.length && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colorSystem.primary100} />
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
