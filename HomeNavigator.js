import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Home from './screens/Home';
import AddImage from './screens/AddImage';

import BoyThemeStyle from './styles/ThemeBoyStyle'
import GirlThemeStyle from './styles/ThemeGirlStyle'

export default class HomeNavigator extends React.Component {
    render() {
        var themeStyle = BoyThemeStyle;
        if (global.gender != null) {
            themeStyle = (global.gender == 'male') ? BoyThemeStyle : GirlThemeStyle;
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
              navigationOptions: {
                title: 'Image',
              },
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
          }
        );

        return (
            <HomeStack/>
        );
    }
}