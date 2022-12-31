import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterStack from "./src/components/navigation/RegisterStack";
import { AppRegistry } from "react-native";
import Service from "./src/components/auth/Services";
import { AuthProvider } from "./src/components/context/AuthContext";
import { AxiosProvider } from "./src/components/context/AxiosContext";
// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
    <Service />
        </AxiosProvider>
    </AuthProvider>
    // <NavigationContainer initialRouteName="Register">
    //   <RegisterStack />
    // </NavigationContainer>
  );
}

export default App;
