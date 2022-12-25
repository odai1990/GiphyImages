import PropTypes from "prop-types";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import colorSystem from "../../styles/ColorSystem";
import CustomToggleIconButton from "../form/CustomToggleIconButton";
import CustomSkeleton from "./CustomSkeleton";

const CustomCard = ({
  id,
  url,
  title,
  desc,
  addToFavorite,
  showDetails,
  isSelected,
  customClasses,
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* here to show image */}
        <Pressable onPress={showDetails}>
          <Image
            onLoad={() => setLoading(false)} // here I toggle show skeleton
            source={{
              uri: url,
            }}
            style={styles.image}
          />
        </Pressable>

        {/* here to show skeleton (loader) in case the image not ready yet */}
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
      </View>

      {/* the rest of information for the card */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}.</Text>
        <Text style={styles.desc}>{desc}</Text>
        <CustomToggleIconButton
          id={id}
          onPress={addToFavorite}
          isSelected={isSelected}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    maxHeight: 400,
    minHeight: 400,
    borderRadius: 6,
    backgroundColor: colorSystem.primary100,
    alignSelf: "center",
    width: "90%",
    marginTop: 30,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  textContainer: {
    padding: 10,
  },
  title: {
    marginBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    color: colorSystem.secondary100,
  },
  desc: {
    fontSize: 10,
    fontWeight: "bold",
    color: colorSystem.secondary100,
  },
});

CustomCard.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  addToFavorite: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  customClasses: PropTypes.object,
};

CustomCard.defaultProps = {
  customClasses: null,
};

export default CustomCard;
