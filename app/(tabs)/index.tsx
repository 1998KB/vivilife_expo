import { Redirect } from "expo-router";
import { View } from "react-native";

export default function index() {
  return (
    <View>
      <Redirect href={"/discover"} />
    </View>
  );
}
