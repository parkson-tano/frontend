import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LoginSVG from "../../../assets/images/login.svg";
import CustomButton from "../CustomButton";
import { AuthContext } from "../context/AuthContext";
import { AxiosContext } from "../context/AxiosContext";
import * as Keychain from "react-native-keychain";
import InputField from "../InputField";
const Login = ({ navigation }) => {
    const [phone_number, setPhoneNumber] = useState("");

    const [password, setPassword] = useState("");
    const authContext = useContext(AuthContext);
    const { publicAxios } = useContext(AxiosContext);

      const onLogin = async () => {
        try {
          const response = await publicAxios.post("/login/", {
            phone_number: phone_number,
            password : password,
          });

          const { accessToken, refreshToken } = response.data;
          authContext.setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
          });

          await Keychain.setGenericPassword(
            "token",
            JSON.stringify({
              accessToken,
              refreshToken,
            })
          );
          
        } catch (error) {
          Alert.alert("Login Failed", error.response);
        }
      };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontFamily: "Roboto-Medium",
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <InputField
          label={"Phone Number"}
          keyboardType="numeric"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e)}
        />

        <InputField
          label={"PIN"}
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
          keyboardType="numeric"
          value={password}
          onChange={(e) => setPassword(e)}
        />

        <CustomButton label={"Login"} onPress={() => onLogin()} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
