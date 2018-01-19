import React, { Component } from 'react';

class TextHelper {
    
}

TextHelper.HomeAvatarNameBaseFontSize = 17;

import AppTextStyle from '../styles/AppTextStyle'
import { Text } from "react-native";
class AppText extends Component {
    render() {
        return (
            <Text style={[AppTextStyle.appText, this.props.style]}>
                {this.props.children}
            </Text>
        );
    };
    
}

export default AppText;