import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, AsyncStorage } from 'react-native';
import { Avatar } from 'react-native-elements';
import AppText from '../helpers/TextHelper';

export default class ChooseGender extends Component {
    constructor(props) {
        super(props);
    }

    maleAvatarPressed() {
        console.log('\nmale');
        global.gender = 'male';
        this.saveGenderSettings('male', 'quat');
        this.props.navigation.navigate('HomeNavigator');
    }

    femaleAvatarPressed() {
        console.log('\nfemale');
        global.gender = 'female';
        this.saveGenderSettings('female', 'chanh');
        this.props.navigation.navigate('HomeNavigator');
    }

    saveGenderSettings = async (gender, username) =>  {
        try {
            await AsyncStorage.multiSet([['gender', gender],['username', username]]);
        } catch (error) {
            // Error saving data
            console.error(error);
        }
    }

    render() {
        let fontSize = 30;

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        let avatarDiameter = screenWidth * 0.3;

        const avatarStyles = StyleSheet.create({
            avatar: {
                height: avatarDiameter,
                width: avatarDiameter,
                borderRadius: avatarDiameter/2,
                borderWidth: 5,
            },
        });

        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'center',
            }}>
                <View style={{
                    height: screenHeight,
                    width: screenWidth/2,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: '#fff75e'
                }} />
                <View style={{
                    height: screenHeight,
                    width: screenWidth/2,
                    position: 'absolute',
                    top: 0,
                    left: screenWidth/2,
                    backgroundColor: '#ffa133'
                }} />
                <Text style={{
                    fontSize: fontSize,
                    textAlign: 'center',
                    margin: 50
                }}>
                    Chọn nhân vật của bạn
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginRight: 30,
                    }}>
                        <Avatar width={avatarDiameter} rounded 
                            source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg'}} 
                            avatarStyle={[avatarStyles.avatar, {borderColor: '#4286f4'}]}
                            onPress={() => this.maleAvatarPressed()} 
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 30,
                    }}>
                        <Avatar width={avatarDiameter} rounded 
                            source={{ uri: 'https://images.moviepilot.com/image/upload/c_fill,h_340,q_auto:good,w_460/b4yxwv7bffhfpc86clig.jpg'}} 
                            avatarStyle={[avatarStyles.avatar, {borderColor: '#f92070'}]} 
                            onPress={() => this.femaleAvatarPressed()} 
                        />
                    </View>
                </View>
            </View>
        )
    }
}