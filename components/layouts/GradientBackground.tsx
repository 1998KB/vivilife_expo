import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={[
        "rgba(155, 236, 0, 0.3)",
        "rgba(155, 236, 0, 0.25)",
        "rgba(155, 236, 0, 0.01)",
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={StyleSheet.absoluteFillObject} // Make sure the gradient fills the entire view
    />
  );
};

export default GradientBackground;
