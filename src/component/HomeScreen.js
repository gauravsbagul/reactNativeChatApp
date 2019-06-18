import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase";
import React, { Component } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Styles from "../Contstants/styles";
export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Chat"
  };

  state = {
    users: []
  };

  componentWillMount() {
    let dbRef = firebase.database().ref("users");
    dbRef.on("child_added", val => {
      let person = val.val();
      person.phone = val.key;
      this.setState(prevState => {
        return {
          users: [...prevState.users, person]
        };
      });
    });
  }

  renderRow = ({ item }) => {
    return (
      <TouchableOpacity>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  _handleLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("LoginScreen");
  };
  render() {
    return (
      <View style={Styles.container}>
        <FlatList
          data={this.state.users}
          renderItem={this.renderRow}
          keyExtractor={item => item.phone}
        />
      </View>
    );
  }
}
