import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Scr1 extends Component {
    render() {
        return (
            <View style={styles.container}>
            <Text>Screen 1</Text>
            </View>
        );
    }
}

export default Scr1;

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