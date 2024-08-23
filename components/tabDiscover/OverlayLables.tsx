import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const OverlayLabels = (cardDimensions: { width: number; height: number }) => ({
  left: {
    title: (
      <FontAwesome6 name="times-circle" size={150} color="rgba(255, 0, 0, 1)" />
    ),
    style: {
      wrapper: {
        backgroundColor: "rgba(225, 0, 0, 0.2)",
        borderRadius: 12,
        width: cardDimensions.width,
        height: cardDimensions.height,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginLeft: 0,
      },
    },
  },
  right: {
    title: (
      <FontAwesome6
        name="check-circle"
        size={150}
        color="rgba(155, 236, 0, 1)"
      />
    ),
    style: {
      wrapper: {
        backgroundColor: "rgba(155, 236, 0, .3)",
        borderRadius: 12,
        width: cardDimensions.width,
        height: cardDimensions.height,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        marginLeft: 0,
      },
    },
  },
});

export default OverlayLabels;
