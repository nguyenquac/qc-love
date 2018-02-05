import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, Animated, Easing } from 'react-native';

export default class CongratAnniversary extends Component {
    constructor(props) {
        super(props);

        var heartAnimatedValueArray = [];
        for (i = 0; i < 40; i++) { 
            heartAnimatedValueArray.push(new Animated.Value(0));
        }
        this.heartAnimatedValues = heartAnimatedValueArray;
    }

    componentDidMount() {
        this.heartBubble();
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
                    easing: Easing.linear,
                    delay: delay,
                }
            ).start();
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ff98a3',
                
            }}>
                {
                        this.heartAnimatedValues.map((item, key) => {
                            const marginBottom = item.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-50, 1000]
                            })

                            let screenWidth = Dimensions.get('window').width;
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
        )
    }
}