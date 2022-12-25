import PropTypes from "prop-types";
import { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";
import CustomToggleIconButton from "../form/CustomToggleIconButton";
import CustomInfoRecord from "./CustomInfoRecord";
import CustomSkeleton from "./CustomSkeleton";
import GestureRecognizer from "react-native-swipe-gestures";

const CustomModel = ({
  id,
  isOpen,
  setIsOpen,
  data,
  favorite,
  removeFromFavoriteItem,
  addToFavorite,
}) => {
  const isAdded = favorite?.findIndex((ele) => ele?.id == data?.id);
  const [loading, setLoading] = useState(true);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer // this is for close the model from swiping left or right only
      onSwipeLeft={() => setIsOpen(false)}
      onSwipeRight={() => setIsOpen(false)}
      config={config}
      style={{
        flex: 1,
      }}
    >
      {/*this is model that appear for show image details*/}
      <Modal visible={isOpen} animationType="slide">
        <View style={styles.container}>
          {/*this is another way to close the model by icon X */}
          <View style={styles.closeButtonContainer}>
            <View style={styles.button}>
              <CustomToggleIconButton
                iconType="close"
                id={`${id}_close`}
                onPress={setIsOpen}
                color={colorSystem.secondary100}
              />
            </View>
          </View>
          {/*her scroll inside the model */}
          <ScrollView>
            <Image
              onLoad={() => setLoading(false)} // here toggle between skelton and image, when finish the skelton gone
              style={styles.image}
              source={{ uri: data?.images?.original?.url }}
            />

            {/*this is skelton loader show when image not ready yet */}
            {loading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  height: "100%",
                  width: "100%",
                }}
              >
                <CustomSkeleton />
              </View>
            )}

            {/*her the add to favorite button */}
            <View style={{ marginLeft: 10 }}>
              <CustomToggleIconButton
                id={`${id}_favorite`}
                size={30}
                onPress={
                  isAdded > -1
                    ? () => removeFromFavoriteItem(isAdded)
                    : () => addToFavorite(data)
                }
                isSelected={favorite.length ? isAdded > -1 : false}
              />
            </View>

            {/*her the rest of the image details */}
            <View style={styles.infoContainer}>
              <CustomInfoRecord title="Title" subTitle={data?.title} />
              <CustomInfoRecord title="Slug" subTitle={data?.slug} />
              <CustomInfoRecord title="Type" subTitle={data?.type} />
              <CustomInfoRecord
                title="url"
                subTitle={data?.images.original.url}
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colorSystem.primary100 },
  closeButtonContainer: {
    backgroundColor: colorSystem.primary100,
  },
  button: {
    paddingBottom: 10,
    paddingRight: 4,
    alignSelf: "flex-end",
  },
  image: {
    resizeMode: "stretch",
    height: 400,
  },
  infoContainer: { marginTop: 20, marginBottom: 20, padding: 10 },
});

CustomModel.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.object,
  id: PropTypes.string.isRequired,
  favorite: PropTypes.array.isRequired,
  removeFromFavoriteItem: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func,
};
CustomModel.defaultProps = {
  isOpen: false,
  data: null,
  addToFavorite: () => {},
};

export default CustomModel;
