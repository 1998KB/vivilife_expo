import React, { useState } from "react";
import { SafeAreaView, Alert, View } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { useSignUpWithEmail } from "@/hooks/authentication/useSignUpWithEmail";
import { useSignInWithEmail } from "@/hooks/authentication/useSignInWithEmail";
import AuthHeader from "@/components/screenAuthentication/AuthHeader";
import InputField from "@/components/screenAuthentication/InputField";
import AuthFooter from "@/components/screenAuthentication/AuthFooter";

const Authentication: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [login, setLogin] = useState<boolean>(true);

  const handleSignUp = () => {
    if (!email || !password || !username || !birthday) {
      Alert.alert("Error", "All fields are required.");
      return;
    }
    useSignUpWithEmail(email, password);
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setBirthday(formatDate(date));
    hideDatePicker();
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <SafeAreaView className="h-full w-full">
      <GradientBackground />

      <View className="p-4 w-full   ">
        <View className="w-full  p-4 rounded-xl shadow-md flex justify-around h-full">
          <AuthHeader isLogin={login} />
          <View>
            {!login && (
              <View>
                <InputField
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  icon="person"
                />
                <InputField
                  placeholder="Birthday"
                  value={birthday}
                  onChangeText={setBirthday}
                  icon="calendar"
                  onPress={showDatePicker}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
            )}
            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              icon="mail"
            />
            <InputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed"
              isPassword
            />
          </View>
          <AuthFooter
            isLogin={login}
            onToggle={() => setLogin(!login)}
            onSubmit={() =>
              login ? useSignInWithEmail(email, password) : handleSignUp()
            }
            buttonText={login ? "Log In" : "Sign Up"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Authentication;
