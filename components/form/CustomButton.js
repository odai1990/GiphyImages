import React from "react";
import PropTypes from "prop-types";
import { Pressable, StyleSheet, Text, View, type } from "react-native";
import colorSystem from "../../styles/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const CustomButton = ({ id, name, onPress, disabled, customClasses }) => {
  return (
    <View style={styles.containerButton}>
      <Pressable
        style={{ ...styles.button, opacity: disabled ? 0.3 : 1 }}
        onPress={disabled ? () => {} : onPress}
        id={id}
      >
        <Text style={styles.name}>{name}</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  containerButton: {
    backgroundColor: colorSystem.secondary90,

    marginTop: 10,
    width: "30%",
    borderRadius: 6,
  },

  button: {
    padding: 10,
  },
  name: {
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
});

CustomButton.propTypes = {
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  secondary100: PropTypes.bool,
  customClasses: PropTypes.object,
};

CustomButton.defaultProps = {
  disabled: false,
  name: "Click",
  customClasses: null,
};

export default CustomButton;
