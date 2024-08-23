import OverlayLabels from "@/components/tabDiscover/OverlayLables";
import { Activity } from "@/types";
import { handleSwipeRight } from "@/utils/swiper/handelSwipeRight";

interface SwiperConfigProps {
  discoverActivities: Activity[];
  currentCardIndex: number;
  cardDimensions: { width: number; height: number };
  setCurrentCardIndex: (index: number) => void;
}

export const getSwiperConfig = ({
  discoverActivities,
  currentCardIndex,
  cardDimensions,
  setCurrentCardIndex,
}: SwiperConfigProps) => ({
  cards: discoverActivities,
  backgroundColor: "transparent",
  stackSize: 2,
  stackScale: 10,
  stackSeparation: 0,
  verticalSwipe: false,
  onSwiped: () => setCurrentCardIndex(currentCardIndex + 1),
  overlayLabels: OverlayLabels(cardDimensions),
  onSwipedRight: handleSwipeRight(discoverActivities, currentCardIndex),
  cardVerticalMargin: 0,
  cardHorizontalMargin: 0,
  containerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  cardStyle: {
    width: "100%",
    height: "100%",
  },
});
