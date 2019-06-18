import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { firebaseConfig } from "../app.config";
import User from "./User";

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  componentWillMount() {
    firebase.initializeApp(firebaseConfig);
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    User.phone = await AsyncStorage.getItem("userPhone");

    if (User.phone) {
      this.props.navigation.navigate("HomeScreen");
    } else {
      this.props.navigation.navigate("LoginScreen");
    }
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              flex: 1
            }
          ]}
        >
          <ActivityIndicator size="large" color="#690021" />
        </View>
      </View>
    );
  }
}
