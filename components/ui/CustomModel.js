import PropTypes from "prop-types";
import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";

const CustomModel = ({ isOpen, setIsOpen, data }) => {
  console.log("====>", data);
  return (
    <Modal visible={isOpen} animationType="slide">
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Image
            style={styles.image}
            source={{ uri: data?.images?.original?.url }}
          />
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>33333312323</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>3333332321</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>333333</Text>
          <Text>331232133333</Text>
        </ScrollView>
      </View>
    </Modal>
  );
};
CustomModel.propTypes = {
  isOpen: PropTypes.bool,
  data: PropTypes.object,
};
CustomModel.defaultProps = {
  isOpen: false,
  data: null,
};

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 400,
  },
});

export default CustomModel;
