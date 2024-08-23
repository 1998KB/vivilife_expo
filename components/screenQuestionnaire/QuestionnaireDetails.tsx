import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

interface QuestionnaireProps {
  type: "comparative" | "standard";
  onResponse: (response: string, type: string) => void;
  onSkip?: () => void;
}

const comparativeAnswers = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
const standardAnswers = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

const QuestionnaireDetails: React.FC<QuestionnaireProps> = ({
  type,
  onResponse,
  onSkip,
}) => {
  const [value, setValue] = useState<number>(2);
  const answers = type === "comparative" ? comparativeAnswers : standardAnswers;

  const handleValueChange = (value: number) => {
    setValue(value);
  };

  const handleConfirm = () => {
    const response = answers[Math.round(value)];
    onResponse(response, type);
  };

  return (
    <View className=" flex items-center justify-center gap-8 h-full p-4">
      <View className="flex justify-center items-center bg-gray-50 p-4 rounded-xl shadow-lg">
        <Text className="text-darkGreen font-bold text-center mb-8">
          Quick question
        </Text>
        <Text className="text-3xl font-bold mb-4 text-center text-darkerGreen">
          {type === "comparative"
            ? "Compared to others your age, would you say your health is...?"
            : "In general, would you say your health is...?"}
        </Text>
        <View className="flex-row items-center justify-between my-5">
          <Slider
            style={{ flex: 1, marginHorizontal: 10 }}
            minimumValue={0}
            maximumValue={4}
            step={1}
            value={value}
            onValueChange={handleValueChange}
            minimumTrackTintColor="#059212"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="rgb(155, 236, 0)"
          />
        </View>
        <Text className="text-2xl font-bold text-center text-darkGreen p-4">
          {answers[Math.round(value)]}
        </Text>
      </View>
      <View className="">
        <TouchableOpacity
          className="mt-5 bg-lightGreen rounded-2xl px-8 py-3"
          onPress={handleConfirm}
        >
          <Text className="text-darkerGreen text-xl font-bold text-center">
            Confirm
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-5 rounded " onPress={onSkip}>
          <Text className="text-darkGreen text-center text-sm font-bold ml-1">
            Skip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QuestionnaireDetails;
