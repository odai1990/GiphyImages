import React from "react";
import PropTypes from "prop-types";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import colorSystem from "../../styles/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const CustomInput = ({
  id,
  label,
  placeholder,
  secureTextEntry,
  onChangeText,
  value,
  customClasses,
  onSubmitEvent,
  icon,
}) => {
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.textAndIconContainer}>
        {/*here to check if the inout has icon or not and make it clickable*/}
        {icon && (
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
              onSubmitEvent();
            }}
          >
            <MaterialIcons
              name={icon}
              size={24}
              style={styles.icon}
              onPress={() => {
                onSubmitEvent();
              }}
            />
          </TouchableWithoutFeedback>
        )}

        <TextInput
          onSubmitEditing={onSubmitEvent}
          style={styles.inputText}
          id={id}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={(e) => onChangeText(e)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    width: "100%",
    color: colorSystem.secondary100,
    marginBottom: 6,
    marginTop: 6,
    fontSize: 16,
    fontWeight: "bold",
  },
  textAndIconContainer: {
    backgroundColor: colorSystem.secondary100,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: { padding: 6 },
  inputText: {
    width: "100%",
    padding: 10,
  },
});

CustomInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  customClasses: PropTypes.object,
  value: PropTypes.string,
  icon: PropTypes.string,
};

CustomInput.defaultProps = {
  secureTextEntry: false,
  placeholder: "",
  label: "",
  value: "",
  customClasses: null,
  icon: "",
  onSubmitEvent: () => {},
};

export default CustomInput;
