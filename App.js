import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';

import HomeNavigator from './HomeNavigator';
import ChooseGender from './screens/ChooseGender';

import BoyThemeStyle from './styles/ThemeBoyStyle'
import GirlThemeStyle from './styles/ThemeGirlStyle'

export default class App extends React.Component {
  
  state = {
    fontLoaded: false,
    genderChosen: false,
    themeStyle: BoyThemeStyle,
  };

  async componentDidMount() {

    // set global username
    var username = '';
    try {
      username = await AsyncStorage.getItem('username');
    } catch (error) {
      // Error retrieving data
    }
    global.username = username;

    global.serverUrl = 'http://qclove.tk/qclove';

    await Font.loadAsync({
      'haptic': require("./assets/fonts/SVN-HapticScript.otf"),
    });

    let gender = null;
    try {
      gender = await AsyncStorage.getItem('gender');
    } catch (error) {
      // Error retrieving data
    }

    if (gender != null) {
      global.gender = gender;
      var selectThemeStyle = (gender == 'male') ? BoyThemeStyle : GirlThemeStyle;
      this.setState({ genderChosen: true, themeStyle: selectThemeStyle});
    }

    this.setState({ fontLoaded: true });
    this.render();
  }
  
  render() {
    if (this.state.fontLoaded == false)
    {
      return null;
    }

    const ChooseGenderStack = StackNavigator({
        ChooseGender: {
          screen: ChooseGender
        },
        HomeNavigator: {
          screen: HomeNavigator
        }
      },
      {
        navigationOptions: {
          header: null,
        }
      }
    );

    if (this.state.genderChosen) {
      return (
        <HomeNavigator/>
      );
    } else {
      return (
        <ChooseGenderStack/>
      );
    }
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
