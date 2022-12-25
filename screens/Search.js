import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import CustomPagination from "../components/ui/CustomPagination";
import { endPoints } from "../api/endPoints";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteItem, setFavoriteItem } from "../redux/favoriteReducer";
import CustomModel from "../components/ui/CustomModel";
import CustomFlatList from "../components/ui/CustomFlatList";
import CustomInput from "../components/form/CustomInput";

const Search = () => {
  const [CurrentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchKey, setSearchKey] = useState("");
  const favorite = useSelector((state) => state.favoriteList.lists);
  const dispatch = useDispatch();
  const pageSize = 20;

  useEffect(() => {
    getImage();
  }, [CurrentPage]);

  const getImage = async () => {
    debugger;
    const config = {
      method: "get",
      url: `${endPoints.GifSearchUrl}&offset=${
        (CurrentPage - 1) * pageSize
      }&q=${searchKey}`,
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
      <CustomFlatList
        id="flatListHome"
        data={data}
        removeFromFavoriteItem={removeFromFavoriteItem}
        addToFavorite={addToFavorite}
        favorite={favorite}
        setSelectedItem={setSelectedItem}
      />
      {(data.length && (
        <View>
          <CustomPagination
            currentPage={CurrentPage}
            totalElement={totalElements}
            pageSize={pageSize}
            setCurrentPage={setCurrentPage}
          />
        </View>
      )) ||
        null}
    </>
  );
};

export default Search;
