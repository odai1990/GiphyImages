import React from "react";
import PropTypes from "prop-types";
import { Pressable, StyleSheet, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const CustomToggleIconButton = ({ id, onPress, isSelected, customClasses }) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} id={id}>
        <MaterialIcons
          name={isSelected ? "favorite" : "favorite-border"}
          size={24}
          color={colorSystem.secondary}
        />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: "30%",
    borderRadius: 6,
  },
});

CustomToggleIconButton.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  IsSelected: PropTypes.bool.isRequired,
  customClasses: PropTypes.object,
};

CustomToggleIconButton.defaultProps = {
  customClasses: null,
  IsSelected: false,
};

export default CustomToggleIconButton;
