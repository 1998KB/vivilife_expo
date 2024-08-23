import React, { useRef, useState } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import GradientBackground from "@/components/layouts/GradientBackground";
import AuthHeader from "@/components/screenAuthentication/AuthHeader";
import AuthFooter from "@/components/screenAuthentication/AuthFooter";
import { useAuth } from "@/contexts/authProvider";
import Toast from "react-native-toast-message";
import AuthForm from "@/components/screenAuthentication/AuthForm";
import { useLocalSearchParams, useRouter } from "expo-router";
import { auth } from "@/firebase";

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
  const router = useRouter();
  const { from } = useLocalSearchParams();

  const handleSubmit = async () => {
    login ? await signIn(email, password) : await signUp(email, password);
    if (auth.currentUser && login) {
      setTimeout(() => {
        if (from === "settings") {
          router.navigate("/discover");
        } else {
          router.back();
        }
      }, 1500);
    }
    if (auth.currentUser && !login) {
      setTimeout(() => {
        router.navigate("/questionnaire");
      }, 1500);
    }
  };
  return (
    <SafeAreaView className="h-full w-full">
      <GradientBackground />
      <View className="mt-20 w-full px-8 rounded-xl shadow-md flex justify-top h-full">
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
          onSubmit={handleSubmit}
          buttonText={login ? "Log In" : "Sign Up"}
        />
      </View>
      <Toast position="bottom" />
    </SafeAreaView>
  );
};

export default Authentication;
