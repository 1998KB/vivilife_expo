import React, { useRef, useState } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import AuthHeader from "@/components/screenAuthentication/AuthHeader";
import AuthFooter from "@/components/screenAuthentication/AuthFooter";
import { useAuth } from "@/contexts/authProvider";
import Toast from "react-native-toast-message";
import AuthForm from "@/components/screenAuthentication/AuthForm";

const Authentication: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const [username, setUsername] = useState<string>("");
  // const [birthday, setBirthday] = useState<string>("");
  const [login, setLogin] = useState<boolean>(true);
  const { signIn, signUp } = useAuth();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const birthdayRef = useRef<TextInput>(null);

  return (
    <SafeAreaView className="h-full w-full">
      <GradientBackground />
      <View className="p-4 w-full">
        <View className="w-full p-4 rounded-xl shadow-md flex justify-center h-full">
          <AuthHeader isLogin={login} />
          <AuthForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            // username={username}
            // setUsername={setUsername}
            // birthday={birthday}
            // setBirthday={setBirthday}
            login={login}
            emailRef={emailRef}
            passwordRef={passwordRef}
            // usernameRef={usernameRef}
            // birthdayRef={birthdayRef}
          />
          <AuthFooter
            isLogin={login}
            onToggle={() => setLogin(!login)}
            onSubmit={() =>
              login ? signIn(email, password) : signUp(email, password)
            }
            buttonText={login ? "Log In" : "Sign Up"}
          />
        </View>
        <Toast position="top" />
      </View>
    </SafeAreaView>
  );
};

export default Authentication;
