import React, { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import Swiper from "react-native-deck-swiper";
import GradientBackground from "@/components/GradientBackground";
import { Activity } from "@/types";
import { router } from "expo-router";
import { filterDiscoverActivities } from "@/helper/activityFiltersHelperFunctions";
import { DataContext } from "@/contexts/context";
import ActivitySwipingCard from "@/components/activitySwipingCard/ActivitySwipingCard";
import OverlayLabels from "@/screens/screenDiscover/OverlayLables";

const buildParams = (activity: Activity) => ({
  id: activity.id,
});

const Discover = () => {
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

  const handleSwipeRight = () => {
    const activity = activities[currentIndex];
    if (activity) {
      const params = buildParams(activity);
      router.push({
        pathname: "/booking",
        params,
      });
    }
  };

  const handleSwipeLeft = () => {
    const activityId = activities[currentIndex].id;
    if (activityId) {
      setDataActivities(
        dataActivities.map((activity) =>
          activity.id === activityId ? { ...activity, deck: false } : activity
        )
      );
      setActivities(
        activities.map((activity) =>
          activity.id === activityId ? { ...activity, deck: false } : activity
        )
      );
    }
  };

  return (
    <View className=" h-screen w-screen mt-4 ">
      <GradientBackground />
      <Swiper
        cards={activities}
        renderCard={(card) => {
          return (
            <ActivitySwipingCard
              card={card}
              cardDimensions={cardDimensions}
              setCardDimentions={setCardDimensions}
            />
          );
        }}
        backgroundColor={"transparent"}
        stackSize={3}
        stackScale={10}
        stackSeparation={0}
        verticalSwipe={false}
        onSwiped={(index) => {
          setCurrentIndex(index + 1);
        }}
        overlayLabels={OverlayLabels(cardDimensions)}
        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        marginTop={0}
        cardVerticalMargin={0}
      />
    </View>
  );
};

export default Discover;
