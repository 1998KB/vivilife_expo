import OverlayLabels from "@/components/tabDiscover/OverlayLables";
import { Activity } from "@/types";
import { handleSwipeRight } from "@/utils/swiper/handelSwipeRight";
import { handleSwipeLeft } from "@/utils/swiper/handleSwipeLeft";

interface SwiperConfigProps {
  activities: Activity[];
  currentIndex: number;
  cardDimensions: { width: number; height: number };

  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setDataActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  dataActivities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
}

export const getSwiperConfig = ({
  activities,
  currentIndex,
  cardDimensions,
  setCurrentIndex,
  setDataActivities,
  dataActivities,
  setActivities,
}: SwiperConfigProps) => ({
  cards: activities,
  backgroundColor: "transparent",
  stackSize: 3,
  stackScale: 10,
  stackSeparation: 0,
  verticalSwipe: false,
  onSwiped: (index: number) => setCurrentIndex(index + 1),
  overlayLabels: OverlayLabels(cardDimensions),
  onSwipedRight: handleSwipeRight(activities, currentIndex),
  onSwipedLeft: handleSwipeLeft(
    activities,
    currentIndex,
    setDataActivities,
    dataActivities,
    setActivities
  ),
  marginTop: 0,
  cardVerticalMargin: 0,
});
