// AuthForm.tsx
import React, { forwardRef, RefObject } from "react";
import { View, TextInput } from "react-native";
import InputField from "@/components/screenAuthentication/InputField";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AuthFormProps {
  email: string;
  setEmail: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  // username: string;
  // setUsername: (text: string) => void;
  // birthday: string;
  // setBirthday: (text: string) => void;
  login: boolean;
  emailRef: RefObject<TextInput>;
  passwordRef: RefObject<TextInput>;
  // usernameRef: RefObject<TextInput>;
  // birthdayRef: RefObject<TextInput>;
}

const AuthForm = forwardRef<any, AuthFormProps>(
  (
    {
      email,
      setEmail,
      password,
      setPassword,
      // username,
      // setUsername,
      // birthday,
      // setBirthday,
      login,
      emailRef,
      passwordRef,
      // usernameRef,
      // birthdayRef,
    },
    ref
  ) => {
    const [isDatePickerVisible, setDatePickerVisibility] =
      React.useState<boolean>(false);

    const showDatePicker = () => {
      // Blur all input fields
      emailRef.current?.blur();
      passwordRef.current?.blur();
      // usernameRef.current?.blur();
      // birthdayRef.current?.blur();
      setDatePickerVisibility(true);
    };

    const hideDatePicker = () => setDatePickerVisibility(false);

    // const handleConfirm = (date: Date) => {
    //   setBirthday(formatDate(date));
    //   hideDatePicker();
    // };

    // const formatDate = (date: Date): string => {
    //   const options: Intl.DateTimeFormatOptions = {
    //     day: "numeric",
    //     month: "long",
    //     year: "numeric",
    //   };
    //   return date.toLocaleDateString("en-GB", options);
    // };

    return (
      <View>
        {/* {!login && (
          <View>
            <InputField
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              icon="person"
              ref={usernameRef}
            />
            <InputField
              placeholder="Birthday"
              value={birthday}
              onChangeText={setBirthday}
              icon="calendar"
              onPress={showDatePicker}
              isBirthday={false}
              isVisible={isDatePickerVisible}
              ref={birthdayRef}
            />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        )} */}
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          icon="mail"
          ref={emailRef}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          icon="lock-closed"
          isPassword
          ref={passwordRef}
        />
      </View>
    );
  }
);

export default AuthForm;
