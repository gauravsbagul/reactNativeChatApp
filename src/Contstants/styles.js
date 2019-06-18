import React from "react";

import { StyleSheet } from "react-native";
import { DEVICE_WIDTH, DEVICE_HIGHT } from "../app.config";
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7158F2"
  },
  InputWrapper: {
    borderColor: "grey",
    backgroundColor: "#F5FCFF",
    borderWidth: 1,
    borderRadius: 20,
    width: DEVICE_WIDTH - 100,
    marginVertical: 10
  },
  PhoneText: {
    color: "black",
    fontSize: 20
  }
});

export default Styles;
