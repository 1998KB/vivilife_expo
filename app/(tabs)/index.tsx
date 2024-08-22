import GradientBackground from "@/components/layouts/GradientBackground";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function index() {
  return (
    <View>
      <GradientBackground />
      <Redirect href={"/discover"} />
    </View>
  );
}
