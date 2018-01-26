import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';

import Home from './screens/Home';
import Scr1 from './screens/Scr1';
import AddImage from './screens/AddImage';

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

    let headerTitleFontSize = 40;

    const HomeStack = StackNavigator({
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'QCLove',
        },
      },
      AddImage: {
        screen: AddImage,
        navigationOptions: ({ navigation }) => ({
          title: 'Image',

        }),
      },
    },
    {
        navigationOptions: {
          headerStyle: themeStyle.header,
          headerTitleStyle: {
            color: 'white',
            fontFamily: 'haptic',
            fontSize: headerTitleFontSize, 
            fontWeight: "200",
            alignSelf: 'center',
          },
          headerBackTitle: null,
          headerTintColor: 'white',
          
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
