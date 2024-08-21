import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TabBarIcons } from "@/types";

type RouteName = "discover" | "wishlist" | "booked";

const icons: TabBarIcons = {
  discover: (props) => (
    <MaterialCommunityIcons name="compass" size={28} color={props.color} />
  ),
  wishlist: (props) => <AntDesign name="heart" size={28} color={props.color} />,
  booked: (props) => <Entypo name="calendar" size={28} color={props.color} />,
};

const labels: { [key in RouteName]: string } = {
  discover: "Discover",
  wishlist: "Wishlist",
  booked: "Booked",
};

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className=" bg-customGreenTab felx justify-center items-center w-full ">
      <View className="flex w-11/12  flex-row items-start  pt-3  h-20    ">
        {state.routes.map((route, index) => {
          if (
            !icons[route.name as RouteName] ||
            !labels[route.name as RouteName]
          ) {
            return null;
          }

          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const IconComponent = icons[route.name as RouteName];

          return (
            <TouchableOpacity
              activeOpacity={1}
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              className="flex-1 justify-center items-center "
            >
              {IconComponent({
                color: isFocused ? "#094505" : "rgba(9, 69, 5, .5)",
              })}
              <Text
                className={`text-xs ${
                  isFocused ? "#094505" : "text-customGreen"
                }`}
              >
                {labels[route.name as RouteName]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default TabBar;
