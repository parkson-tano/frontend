// App.js

import React, { useCallback, useContext, useEffect, useState } from "react";
import Login from "./Login";
import { AuthContext } from "../context/AuthContext";
import * as Keychain from "react-native-keychain";
import Dashboard from "../Dashboard";
import Spinner from "../Spinner";
const Service = () => {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const jwt = JSON.parse(value.password);

      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);

  if (status === "loading") {
    return <Spinner />;
  }

  if (authContext?.authState?.authenticated === false) {
    return <Login />;
  } else {
    return <Dashboard />;
  }
};

export default Service;
