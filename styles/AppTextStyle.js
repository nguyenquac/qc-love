import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    appText: {
        fontFamily: Platform.OS === 'ios' ? "Trebuchet MS" : "sans-serif",
    }
  });