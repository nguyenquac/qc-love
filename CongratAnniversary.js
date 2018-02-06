import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, Animated, Easing, TouchableHighlight } from 'react-native';

export default class CongratAnniversary extends Component {
    constructor(props) {
        super(props);

        var heartAnimatedValueArray = [];
        for (i = 0; i < 50; i++) { 
            heartAnimatedValueArray.push(new Animated.Value(0));
        }
        this.heartAnimatedValues = heartAnimatedValueArray;

        this.zoomAnimatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.heartBubble();
        this.zoomCongrat();
    }

    // ANNI ANIMATION
    heartBubble() {
        for (i = 0; i < this.heartAnimatedValues.length; i++) {
            var animatedValue = this.heartAnimatedValues[i];
            let duration = Math.floor(Math.random()*(4000-3000+1) + 3000);
            let delay = Math.floor(Math.random()*(2000+1) + 0);
            Animated.timing(
                animatedValue,
                {
                    toValue: 1,
                    duration: duration,
                    easing: Easing.in(Easing.ease),
                    delay: delay,
                }
            ).start();
        }
    }

    zoomCongrat() {
        Animated.timing(
            this.zoomAnimatedValue,
            {
                toValue: 1,
                duration: 1500,
            }
        ).start();
    }

    onPressScreen() {
        this.props.navigation.navigate('Home');
    }

    render() {

        let screenWidth = Dimensions.get('window').width;
        let screenHeight = Dimensions.get('window').height;

        let anniContentWidth = screenWidth*0.8;
        let anniContentHeight = anniContentWidth * 1208/940;

        const anniScale = this.zoomAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        })

        return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#ff98a3',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableHighlight onPress={this.onPressScreen.bind(this)} style={{
                        width: screenWidth,
                        height: screenHeight,
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Animated.Image
                                source={require('./assets/happyAnniversary_content.png')}
                                style={{
                                    width: anniContentWidth,
                                    height: anniContentHeight,
                                    resizeMode: 'contain',
                                    transform: [{scale: anniScale}]
                                }}
                            />

                            {
                                this.heartAnimatedValues.map((item, key) => {
                                    const marginBottom = item.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, screenHeight]
                                    })

                                    let leftMargin = Math.floor(Math.random()*(screenWidth-10+1) + 10);

                                    return (
                                        <Animated.Image
                                            key={key}
                                            source={require('./assets/heart.png')}
                                            style={{
                                                height: 30,
                                                width: 30,
                                                position: 'absolute',
                                                bottom: marginBottom,
                                                left: leftMargin,
                                            }}
                                        />
                                    )
                                })
                            }
                        </View>
                    </TouchableHighlight>
                </View>
        )
    }
}