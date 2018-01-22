import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';

import Home from './screens/Home';
import Scr1 from './screens/Scr1';

import BoyThemeStyle from './styles/ThemeBoyStyle'
const themeStyle = BoyThemeStyle;

export default class App extends React.Component {
  
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'haptic': require("./assets/fonts/SVN-HapticScript.otf"),
    });

    this.setState({ fontLoaded: true });
    this.render();
  }
  
  render() {
    if (this.state.fontLoaded == false)
    {
      return null;
    }
    const HomeStack = StackNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'Home',
        },
      },
      Scr1: {
        screen: Scr1,
        navigationOptions: ({ navigation }) => ({
          title: 'Screen 1',
        }),
      },
    },
    {
        navigationOptions: {
          headerStyle: themeStyle.header,
          headerTitleStyle: themeStyle.headerTitleStyle 
        }
    });

    return (
      <HomeStack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  red: {
	  color: 'red'
  }
});
