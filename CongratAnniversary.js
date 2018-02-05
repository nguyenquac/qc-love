import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, Animated, Easing } from 'react-native';

export default class CongratAnniversary extends Component {
    constructor(props) {
        super(props);

        var heartAnimatedValueArray = [];
        for (i = 0; i < 20; i++) { 
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
            Animated.timing(
                animatedValue,
                {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.linear
                }
            ).start();
        }
    }

    render() {
        return (
            <View style={{
                flex: 1,
            }}>
                {
                        this.heartAnimatedValues.map((item, key) => {
                            const marginBottom = item.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-20, 1000]
                            })

                            return (
                                <Animated.Image
                                    key={key}
                                    source={require('./assets/heart-stroke.png')}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        position: 'absolute',
                                        bottom: marginBottom,
                                        left: 100,
                                    }}
                                />
                            )
                        })
                    }
            </View>
        )
    }
}