import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import CustomCard from "../components/ui/CustomCard";
import CustomPagination from "../components/ui/CustomPagination";
import { endPoints } from "../api/endPoints";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/favoriteReducer";

const Home = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const favorite = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();
  const pageSize = 20;

  useEffect(() => {
    getImage();
  }, [CurrentPage]);

  const getImage = async () => {
    const config = {
      method: "get",
      url: `${endPoints.GifTrendingUrl}&offset=${(CurrentPage - 1) * pageSize}`,
      headers: {},
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
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={(itemDate) => {
          const isAdded = favorite?.findIndex(
            (ele) => ele.id == itemDate.item.id
          );
          return (
            <View>
              <CustomCard
                id={itemDate.item.id}
                url={itemDate.item.images.original.url}
                title={itemDate.item.title}
                desc={itemDate.item.slug}
                addToFavorite={() =>
                  isAdded > -1
                    ? removeFromFavoriteItem(isAdded)
                    : addToFavorite(itemDate.item)
                }
                showDetails={() => {
                  console.log("ddddddddddddddddddddddddddddddddddddd");
                }}
                isSelected={favorite.length ? isAdded > -1 : false}
              />
            </View>
          );
        }}
        keyExtractor={(item) => {
          return item.id;
        }}
      />

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
