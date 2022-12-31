import React, { useContext, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { AuthContext } from "./context/AuthContext";
import { AxiosContext } from "./context/AxiosContext";
import Spinner from "./Spinner";

const Dashboard = () => {
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("idle");



  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <View style={styles.container}>

      <View style={styles.buttonGroup}>

        <Button title="Logout" onPress={() => authContext.logout()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "90%",
    height: "50%",
    resizeMode: "contain",
  },
  buttonGroup: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});
export default Dashboard;
