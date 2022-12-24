import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";

const CustomInput = ({
  id,
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  customClasses,
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.inputText}
        id={id}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(e) => onChangeText(e)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    color: colorSystem.secondary,
    marginBottom: 6,
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputText: {
    padding: 10,
    backgroundColor: colorSystem.secondary,
    borderRadius: 4,
  },
});

CustomInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  customClasses: PropTypes.object,
  value: PropTypes.string,
};

CustomInput.defaultProps = {
  secureTextEntry: false,
  placeholder: "",
  label: "",
  value: "",
  customClasses: null,
};

export default CustomInput;
