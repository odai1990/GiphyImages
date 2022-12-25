import PropTypes from "prop-types";
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
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable onPress={showDetails}>
          <Image
            source={{
              uri: url,
            }}
            style={styles.image}
          />
        </Pressable>
      </View>
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
    // marginBottom: 6,
    // marginTop: 6,
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
