import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

import CongratAnniversary from './CongratAnniversary'
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

        let isAnniversary = true;

        let headerTitleFontSize = 40;

        if (isAnniversary) {
          const HomeStack = StackNavigator({
              CongratAnniversary: {
                screen: CongratAnniversary,
                navigationOptions: {
                  header: null,
                },
              },
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
        else {
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
}