import React from "react";
import { SafeAreaView, Text } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import QuestionnaireDetails from "@/components/screenQuestionnaire/QuestionnaireDetails";

const QuestionnaireContainer = () => {
  const isComparative = Math.random() > 0.5;

  const handleResponse = (response: string, type: string) => {
    console.log(`Response: ${response}, Type: ${type}`);
  };

  const handleSkip = () => {
    console.log("Skipped");
  };

  return (
    <SafeAreaView className="flex-1 justify-center ">
      <GradientBackground />
      <QuestionnaireDetails
        type={isComparative ? "comparative" : "standard"}
        onResponse={handleResponse}
        onSkip={handleSkip}
      />
    </SafeAreaView>
  );
};

export default QuestionnaireContainer;
