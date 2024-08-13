import React, { useContext, useState } from "react";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import GradientBackground from "@/components/layouts/GradientBackground";
import { DataContext } from "@/contexts/dataContext";
import { Activity } from "@/types";
import { getSwiperConfig } from "@/hooks/getSwiperConfig";
import { filterDiscoverActivities } from "@/utils/filters/filterDiscoverActivities";
import ActivitySwipingCard from "@/components/tabDiscover/ActivitySwipingCard";

export default function Discover() {
  const { setDataActivities, dataActivities } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activities, setActivities] = useState(
    filterDiscoverActivities(dataActivities)
  );
  const [cardDimensions, setCardDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const swiperConfig = getSwiperConfig({
    activities,
    currentIndex,
    cardDimensions,
    setCurrentIndex,
    setDataActivities,
    dataActivities,
    setActivities,
  });

  return (
    <View className="h-screen w-screen mt-4">
      <GradientBackground />
      <Swiper
        renderCard={(card: Activity) => {
          return (
            <ActivitySwipingCard
              key={card.id}
              card={card}
              cardDimensions={cardDimensions}
              setCardDimensions={setCardDimensions}
            />
          );
        }}
        {...swiperConfig}
      />
    </View>
  );
}
