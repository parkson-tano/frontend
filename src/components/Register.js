import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useState } from "react";
import tw from "twrnc";
import axios from "axios";
import InputField from "./InputField";
import DatePicker from "react-native-date-picker";
import CustomButton from './CustomButton';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const Register = ({ navigation }) => {
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";
  const mtn_URL =
    "https://info307-production.up.railway.app/account/register-mtn/";
  const age_URL =
    "https://info307-production.up.railway.app/account/register-agent/";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [idNum, setIdNum] = useState("");
  const [mtnId, setMtnId] = useState("")
    const [open, setOpen] = useState(false);
    const [dobLabel, setDobLabel] = useState("Date of Birth");
  const create_mtn = (event) => {
    event.preventDefault();
    axios
      .post(mtn_URL, {
        profile_pic: null,
        id_num: idNum,
        date_of_birth: null,
        place_of_birth: placeOfBirth,
        address: address,
        first_name: firstName,
        last_name: lastName,
        front_pic: null,
        rear_pic: null,
        balance: 0,
        verified: true,
      })
      .then((response) => {
        console.log(response.data);
        alert("Success");
		setMtnId(response.data.id)
		console.log(mtnId)
        navigation.navigate("MomoRegister", { mtn_id: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 25 }}>
      <Text style={tw.style("text-md", "text-red-500")}>Create an Account</Text>
      <InputField
        label={"First Name"}
        value={firstName}
        onChange={(e) => setFirstName(e)}
      />
      <InputField
        label={"Last Name"}
        value={lastName}
        onChange={(e) => setLastName(e)}
      />
      <InputField
        label={"Id Num"}
        value={idNum}
        onChange={(e) => setIdNum(e)}
      />
      <InputField
        label={"Address"}
        value={address}
        onChange={(e) => setAddress(e)}
      />
      <InputField
        label={"Place of Birth"}
        value={placeOfBirth}
        onChange={(e) => setPlaceOfBirth(e)}
      />
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity onPress={() => setOpen(true)}>
          <Text style={{ color: "#666", marginLeft: 5, marginTop: 5 }}>
            {dobLabel}
          </Text>
        </TouchableOpacity>
      </View>

      <CustomButton label={"Register"} onPress={create_mtn} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 30,
        }}
      >
        <Text>Already registered?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Register;
