import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import AuthLoadingScreen from "./src/component/AuthLoadingScreen";
import HomeScreen from "./src/component/HomeScreen";
import LoginScreen from "./src/component/LoginScreen";

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator({ HomeScreen: HomeScreen });
const AuthStack = createStackNavigator({ LoginScreen: LoginScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
