import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import CustomCard from "./CustomCard";

const CustomFlatList = ({
  id,
  data,
  removeFromFavoriteItem,
  addToFavorite,
  setSelectedItem,
  favorite,
}) => {
  const flatListRef = useRef();

  useEffect(() => {
    toTop();
  }, [data]);

  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };
  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={(itemDate) => {
        const isAdded = favorite?.findIndex(
          (ele) => ele.id == itemDate.item.id
        );
        return (
          <View>
            <CustomCard
              id={itemDate.item.id}
              url={itemDate.item.images.fixed_height.url}
              title={itemDate.item.title}
              desc={itemDate.item.slug}
              addToFavorite={() =>
                isAdded > -1
                  ? removeFromFavoriteItem(isAdded)
                  : addToFavorite(itemDate.item)
              }
              showDetails={() => {
                setSelectedItem(itemDate.item);
              }}
              isSelected={favorite.length ? isAdded > -1 : false}
            />
          </View>
        );
      }}
      keyExtractor={(item, index) => {
        return item.id + id + index;
      }}
    />
  );
};

CustomFlatList.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  removeFromFavoriteItem: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func,
  setSelectedItem: PropTypes.func.isRequired,
  favorite: PropTypes.array.isRequired,
};
CustomFlatList.defaultProps = {
  addToFavorite: () => {},
};

export default CustomFlatList;
