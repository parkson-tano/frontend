import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import axios from "axios";
const MomoRegister = ({ route, navigation }) => {
  const { mtn_id } = route.params;
        const momo_URL =
          "https://info307-production.up.railway.app/account/register/";

        const [phoneNumber, setPhoneNumber] = useState("");
        const [password, setPassword] = useState("");
        const [momoAccount, SetMomoAccount] = useState(mtn_id);

    const create_momo = (event) => {
      event.preventDefault();
      axios
        .post(momo_URL, {
          password: password,
          phone_number: phoneNumber,
          mtn_account: momoAccount,
        })
        .then((response) => {
          console.log(response.data);
          alert("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}>
      <Text>MomoRegister</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(e) => setPhoneNumber(e)}
        placeholder="Phone Number"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
        placeholder="Password"
        keyboardType="numeric"
      />
      <Button title="Register" onPress={create_momo} />
      <Button
        title="Register as Agent"
        onPress={() => navigation.navigate("AgentRegister", { mtn_id: mtn_id })}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default MomoRegister