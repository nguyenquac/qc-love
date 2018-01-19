import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    appText: {
        fontFamily: Platform.OS === 'ios' ? "Trebuchet MS" : "sans-serif",
        color: '#1e1e1e',
    }
  });