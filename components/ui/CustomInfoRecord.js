import PropTypes from "prop-types";
import { StyleSheet, Text, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";

const CustomInfoRecord = ({ title, subTitle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${title}  `}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorSystem.secondary100,
  },
  subTitle: {
    fontSize: 16,
    paddingLeft: 2,
    fontWeight: "bold",
    color: colorSystem.secondary90,
  },
});

CustomInfoRecord.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
};
CustomInfoRecord.defaultProps = {
  title: "",
  subTitle: "",
};

export default CustomInfoRecord;
