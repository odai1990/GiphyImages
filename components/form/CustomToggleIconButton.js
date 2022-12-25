import React from "react";
import PropTypes from "prop-types";
import { Pressable, StyleSheet, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const CustomToggleIconButton = ({
  id,
  onPress,
  isSelected,
  iconType,
  color,
  customClasses,
  size,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        id={id}
        style={({ pressed }) => pressed && styles.active}
      >
        <MaterialIcons
          name={
            iconType ? iconType : isSelected ? "favorite" : "favorite-border"
          }
          size={size}
          color={color}
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
  active: {
    opacity: 0.3,
  },
});

CustomToggleIconButton.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  iconType: PropTypes.string,
  color: PropTypes.string,
  IsSelected: PropTypes.bool,
  customClasses: PropTypes.object,
  size: PropTypes.number,
};

CustomToggleIconButton.defaultProps = {
  customClasses: null,
  IsSelected: false,
  iconType: "",
  color: colorSystem.secondary100,
  size: 24,
};

export default CustomToggleIconButton;
