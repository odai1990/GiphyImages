import { View, Animated, StyleSheet, Easing, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);
const width = Dimensions.get("window").width;

const CustomSkeleton = () => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.easeIn,
        useNativeDriver: true,
      })
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={{
        backgroundColor: "#a0a0a0",
        borderColor: "#bababa",
        height: "100%",

        overflow: "hidden",
      }}
    >
      <AnimatedLG
        colors={["#a0a0a0", "#bababa", "#bababa", "#a0a0a0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          ...StyleSheet.absoluteFill,

          transform: [{ translateX: translateX }],
        }}
      />
    </View>
  );
};

export default CustomSkeleton;
