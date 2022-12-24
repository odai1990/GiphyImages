import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colorSystem from "../../styles/ColorSystem";
import { MaterialIcons } from "@expo/vector-icons";
const CustomPagination = ({
  currentPage,
  totalElement,
  pageSize,
  setCurrentPage,
}) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setTotalPage(Math.ceil(totalElement / pageSize));
  }, [totalElement]);

  const styledNumber = (number) => {
    return currentPage == number ? styles.activeNumber : styles.numbers;
  };

  const getPrevAndNextIcon = (name, type) => {
    const go = () => {
      if (type == "next" && currentPage + 1 <= totalPage)
        setCurrentPage((pre) => pre + 1);
      if (type == "before" && currentPage - 1 > 0)
        setCurrentPage((pre) => pre - 1);
    };

    return (
      <Pressable onPress={() => go()}>
        <MaterialIcons name={name} size={24} color={colorSystem.secondary} />
      </Pressable>
    );
  };

  const getNumbers = () => {
    switch (true) {
      case totalPage <= 5:
        return Array.apply("0", Array(totalPage)).map((ele, index) => {
          return (
            <Text key={ele} style={styledNumber(index + 1)}>
              {index + 1}
            </Text>
          );
        });
      case currentPage < 4:
        return (
          <>
            <Text onPress={() => setCurrentPage(1)} style={styledNumber(1)}>
              1
            </Text>
            <Text onPress={() => setCurrentPage(2)} style={styledNumber(2)}>
              2
            </Text>
            <Text onPress={() => setCurrentPage(3)} style={styledNumber(3)}>
              3
            </Text>
            <Text onPress={() => setCurrentPage(4)} style={styledNumber(4)}>
              4
            </Text>
            <Text onPress={() => setCurrentPage(5)} style={styledNumber(5)}>
              5
            </Text>
          </>
        );
      case currentPage > totalPage - 5:
        return (
          <>
            <Text
              onPress={() => setCurrentPage(totalPage - 4)}
              style={styledNumber(totalPage - 4)}
            >
              {totalPage - 4}
            </Text>
            <Text
              onPress={() => setCurrentPage(totalPage - 3)}
              style={styledNumber(totalPage - 3)}
            >
              {totalPage - 3}
            </Text>
            <Text
              onPress={() => setCurrentPage(totalPage - 2)}
              style={styledNumber(totalPage - 2)}
            >
              {totalPage - 2}
            </Text>
            <Text
              onPress={() => setCurrentPage(totalPage - 1)}
              style={styledNumber(totalPage - 1)}
            >
              {totalPage - 1}
            </Text>
            <Text
              onPress={() => setCurrentPage(totalPage)}
              style={styledNumber(totalPage)}
            >
              {totalPage}
            </Text>
          </>
        );

      case currentPage <= totalPage - 5 && currentPage >= 4:
        return (
          <>
            <Text
              onPress={() => setCurrentPage(currentPage - 2)}
              style={styledNumber(currentPage - 2)}
            >
              {currentPage - 2}
            </Text>
            <Text
              onPress={() => setCurrentPage(currentPage - 1)}
              style={styledNumber(currentPage - 1)}
            >
              {currentPage - 1}
            </Text>
            <Text
              onPress={() => setCurrentPage(currentPage)}
              style={styledNumber(currentPage)}
            >
              {currentPage}
            </Text>
            <Text
              onPress={() => setCurrentPage(currentPage + 1)}
              style={styledNumber(currentPage + 1)}
            >
              {currentPage + 1}
            </Text>
            <Text
              onPress={() => setCurrentPage(currentPage + 2)}
              style={styledNumber(currentPage + 2)}
            >
              {currentPage + 2}
            </Text>
          </>
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getPrevAndNextIcon("navigate-before", "before")}
      </View>
      <View style={styles.numberContainer}>{getNumbers()}</View>
      <View style={styles.iconContainer}>
        {getPrevAndNextIcon("navigate-next", "next")}
      </View>
    </View>
  );
};

CustomPagination.propTypes = {};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 40,
    borderRadius: 6,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 40,
    alignSelf: "center",
    backgroundColor: colorSystem.primary100,
  },
  prevAndNext: {
    color: colorSystem.secondary,
  },
  iconContainer: {
    alignSelf: "center",
    padding: 4,
  },
  numberContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
  },
  numbers: {
    color: colorSystem.secondary,
    padding: 10,
  },
  activeNumber: {
    color: colorSystem.primary100,
    backgroundColor: colorSystem.secondary,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 6,
  },
});
CustomPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalElement: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
export default CustomPagination;
