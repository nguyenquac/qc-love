import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    appText: {
        fontFamily: Platform.OS === 'ios' ? "Trebuchet MS" : "haptic",
        color: '#1e1e1e',
        backgroundColor: 'transparent',
    }
  });