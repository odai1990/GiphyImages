import PropTypes from "prop-types";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";

const CustomTabs = ({ tabsNames, onPress, selectedTab }) => {
  return (
    <View style={styles.container}>
      {tabsNames?.map((ele, index) => (
        <View
          key={ele + index}
          style={{ ...styles.tab, opacity: selectedTab == index ? 0.7 : 1 }}
        >
          <Pressable onPress={() => onPress(index)}>
            <Text style={styles.text}>{ele}</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  tab: {
    backgroundColor: colorSystem.primary100,
    flex: 1,
    display: "flex",
    padding: 20,
  },
  text: {
    // alignSelf: "center",
    textAlign: "center",
    width: "100%",
    color: colorSystem.secondary100,
    fontSize: 20,
    fontWeight: "bold",
  },
});
CustomTabs.propTypes = {};

export default CustomTabs;
