import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import React, { Component } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import styles from "../Contstants/styles";
import User from "./User";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    phone: "",
    name: ""
  };

  componentWillMount() {
    AsyncStorage.getItem("userPhone").then(phone => {
      if (phone) {
        this.setState({ phone });
      }
    });
  }

  _handleForm = async () => {
    const { phone, name } = this.state;
    if (phone.length < 10) {
      Alert.alert("Error", "Wrong Mobile Number");
    } else if (name.length < 3) {
      Alert.alert("Error", "Wrong name");
    } else {
      //save data to fireabase
      Alert.alert("Done", "Number saved");
      await AsyncStorage.setItem("userPhone", phone);
      User.phone = phone;
      firebase
        .database()
        .ref("users/" + User.phone)
        .set({ name });
      this.props.navigation.navigate("HomeScreen");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.InputWrapper}>
          <TextInput
            placeholder="Mobile number"
            placeholderTextColor="#000"
            keyboardType="number-pad"
            style={{ marginLeft: 20, fontSize: 20 }}
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <View style={styles.InputWrapper}>
          <TextInput
            placeholder="Name"
            keyboardType="default"
            placeholderTextColor="#000"
            style={{ marginLeft: 20, fontSize: 20 }}
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
        </View>
        <Button
          onPress={() => this._handleForm()}
          title="Enter"
          color="#841584"
        />
      </View>
    );
  }
}
