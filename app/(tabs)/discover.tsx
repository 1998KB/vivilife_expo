import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import GradientBackground from "@/components/layouts/GradientBackground";
import { DataContext } from "@/contexts/dataProvider";
import { Activity } from "@/types";
import { getSwiperConfig } from "@/hooks/getSwiperConfig";
import ActivitySwipingCard from "@/components/tabDiscover/ActivitySwipingCard";
import { SafeAreaView } from "react-native";
import { filterDiscoverActivities } from "@/utils/filters/filterDiscoverActivities";
import Toast from "react-native-toast-message";

export default function Discover() {
  const { discoverActivities, setDiscoverActivities } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [cardDimensions, setCardDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const swiperConfig = getSwiperConfig({
    discoverActivities,
    setDiscoverActivities,
    cardDimensions,
    currentIndex,
    setCurrentIndex,
  });

  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <GradientBackground />
      <View className="mt-9 flex-1 justify-center items-center">
        {discoverActivities.length > 0 ? (
          <Swiper
            renderCard={(card: Activity) => (
              <ActivitySwipingCard
                key={card.id}
                card={card}
                cardDimensions={cardDimensions}
                setCardDimensions={setCardDimensions}
              />
            )}
            {...swiperConfig}
          />
        ) : (
          <ActivityIndicator size="large" color="#094505" />
          // <LottieView
          //   source={Gif}
          //   autoPlay
          //   loop
          //   style={{ width: 200, height: 200 }}
          // />
        )}
      </View>
    </SafeAreaView>
  );
}
