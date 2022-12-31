import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import React, { useState } from "react";
import axios from "axios";
const AgentRegister = ({ route, navigation }) => {
  const { mtn_id } = route.params;
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";
  const agent_URL =
    "https://info307-production.up.railway.app/account/register-agent/";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [momoAccount, SetMomoAccount] = useState(mtn_id);
  const [userID, setUserID] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [mtnAccount, SetMtnAccount] = useState(mtn_id);
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
        setUserID(response.data.id);
        axios
          .post(agent_URL, {
            agent_name: agentName,
            agent_code: agentCode,
            mtn_account: momoAccount,
            user: response.data.id,
          })
          .then((response) => {
            console.log(response.data);
            alert("Success");
          })
          .catch((error) => {
            console.log(error.response);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text>AgentRegister</Text>
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
      <TextInput
        style={styles.input}
        value={agentName}
        onChangeText={(e) => setAgentName(e)}
        placeholder="Agent Name"
      />
      <TextInput
        style={styles.input}
        value={agentCode}
        onChangeText={(e) => setAgentCode(e)}
        placeholder="Agent Code"
        keyboardType="numeric"
      />
      <Button title="Register" onPress={create_momo} />
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
export default AgentRegister;
