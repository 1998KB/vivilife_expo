import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import Swiper from "react-native-deck-swiper";
import GradientBackground from "@/components/layouts/GradientBackground";
import { DataContext } from "@/contexts/dataProvider";
import { Activity } from "@/types";
import { getSwiperConfig } from "@/hooks/getSwiperConfig";
import ActivitySwipingCard from "@/components/tabDiscover/ActivitySwipingCard";
import { SafeAreaView } from "react-native";
import { useAuth } from "@/contexts/authProvider";

export default function Discover() {
  const { discoverActivities, currentCardIndex, setCurrentCardIndex } =
    useContext(DataContext);
  const { currentUser } = useAuth();

  const [cardDimensions, setCardDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const swiperConfig = getSwiperConfig({
    discoverActivities,
    cardDimensions,
    currentCardIndex,
    setCurrentCardIndex,
  });

  useEffect(() => {
    setCurrentCardIndex(0);
  }, [discoverActivities, currentUser]);

  return (
    <SafeAreaView className="flex-1 h-full w-full">
      <GradientBackground />
      <View className="flex-1 justify-center items-center my-6 mx-4">
        {discoverActivities.length > 0 ? (
          <Swiper
            cardIndex={currentCardIndex}
            renderCard={(card: Activity) => {
              if (!card || !card.id) {
                return <ActivityIndicator size="large" color="#094505" />;
              }
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
