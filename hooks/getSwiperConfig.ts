import OverlayLabels from "@/components/tabDiscover/OverlayLables";
import { Activity } from "@/types";
import { handleSwipeRight } from "@/utils/swiper/handelSwipeRight";

interface SwiperConfigProps {
  discoverActivities: Activity[];
  setDiscoverActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  currentIndex: number;
  cardDimensions: { width: number; height: number };
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const getSwiperConfig = ({
  discoverActivities,
  currentIndex,
  cardDimensions,
  setCurrentIndex,
  setDiscoverActivities,
}: SwiperConfigProps) => ({
  cards: discoverActivities,
  backgroundColor: "transparent",
  stackSize: 3,
  stackScale: 10,
  stackSeparation: 0,
  verticalSwipe: false,
  onSwiped: () => setCurrentIndex(currentIndex + 1),
  overlayLabels: OverlayLabels(cardDimensions),
  onSwipedRight: handleSwipeRight(discoverActivities, currentIndex),
  marginTop: 0,
  cardVerticalMargin: 0,
});
