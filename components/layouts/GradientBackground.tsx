import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = () => {
  return (
    <LinearGradient
      colors={[
        "rgba(155, 236, 0, 0.1)",
        "rgba(155, 236, 0, 0.1)",
        "rgba(155, 236, 0, 0.1)",
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={StyleSheet.absoluteFillObject} // Make sure the gradient fills the entire view
    />
  );
};

export default GradientBackground;
