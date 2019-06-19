import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import React, { Component } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button
} from "react-native";
import Styles from "../Contstants/styles";
import User from "./User";
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Chats"
  };

  state = {
    users: []
  };

  componentWillMount() {
    let dbRef = firebase.database().ref("users");
    console.log("TCL: HomeScreen -> componentWillMount -> dbRef", dbRef);
    dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState({
          users: [...this.state.users, person]
        });
      }
    });
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("ChatScreen", {
            name: item.name,
            phone: item.phone
          })
        }
        style={{
          padding: 10,
          borderBottomColor: "#ccc",
          borderWidth: 1
          // border: 1
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _handleLogout = async () => {
    console.log("TCL: _handleLogout -> _handleLogout");
    await AsyncStorage.clear();
    this.props.navigation.navigate("LoginScreen");
  };
  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
        <Button
          onPress={() => this._handleLogout()}
          title="Logout"
          color="#841584"
        />
      </ScrollView>
    );
  }
}
