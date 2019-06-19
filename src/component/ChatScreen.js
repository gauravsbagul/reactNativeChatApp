import firebase from "firebase";
import React, { Component } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView
} from "react-native";
import styles from "../Contstants/styles";
import User from "./User";
export default class ChatScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name", null)
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      person: {
        name: props.navigation.getParam("name"),
        phone: props.navigation.getParam("phone")
      },
      textMessage: "",
      messageList: []
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("messages")
      .child(User.phone)
      .child(this.state.person.phone)
      .orderByChild("time")
      .on("child_added", value => {
        console.log("TCL: componentWillMount -> value", value.val());

        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
    firebase
      .database()
      .ref("messages")

      .child(this.state.person.phone)
      .child(User.phone)
      .orderByChild("time")
      .on("child_added", value => {
        console.log("TCL: componentWillMount -> value", value.val());
        this.setState(prevState => {
          return {
            messageList: [...prevState.messageList, value.val()]
          };
        });
      });
  }

  componentDidMount() {}
  _handleSend = async () => {
    console.log("TCL: _handleSend -> _handleSend");
    if (this.state.textMessage.length > 0) {
      console.log(
        "TCL: _handleSend -> this.state.textMessage.length",
        this.state.textMessage.length
      );
      let updates = {};
      let msgID = firebase
        .database()
        .ref("messages")
        .child(User.phone)
        .child(this.state.person.phone)
        .push().key;

      let message = {
        message: this.state.textMessage,
        time: firebase.database.ServerValue.TIMESTAMP,
        from: User.phone
      };
      console.log("TCL: _handleSend -> message", message);
      updates[
        "messages/" + User.phone + "/" + this.state.person.phone + "/" + msgID
      ] = message;
      //   updates[
      //     "messages/" + this.state.person.phone + "/" + User.phone + msgID
      //   ] = message;

      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({
        textMessage: ""
      });
    }
  };
  renderRow = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          width: "60%",
          alignSelf: item.from === User.phone ? "flex-end" : "flex-start",
          backgroundColor: item.from === User.phone ? "#00987b" : "#7cb342",
          borderRadius: 5,
          marginBottom: 5
        }}
      >
        <Text
          style={{
            color: "#fff",
            padding: 7,
            fontSize: 16
          }}
        >
          {item.message}
        </Text>
        <Text
          style={{
            color: "#eee",
            padding: 3,
            fontSize: 12
          }}
        >
          {item.time}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={64}>
        <SafeAreaView>
          <FlatList
            style={{
              padding: 10,
              height: 500
            }}
            data={this.state.messageList.sort()}
            renderItem={this.renderRow}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View style={styles.InputWrapper}>
              <TextInput
                placeholder="Write here"
                placeholderTextColor="#000"
                keyboardType="default"
                style={{
                  marginLeft: 20,
                  fontSize: 15
                }}
                value={this.state.textMessage}
                onChangeText={textMessage =>
                  this.setState({
                    textMessage
                  })
                }
              />
            </View>
            <Button
              onPress={() => this._handleSend()}
              title="Send"
              color="#841584"
            />
          </View>
          <Text />
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
