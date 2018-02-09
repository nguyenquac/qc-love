import React, { PureComponent } from 'react';
import {Text, View, Dimensions, Image, Platform} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import AppText from './helpers/TextHelper'
import AvView from './AvView';
import Moment, { now } from 'moment';
import Home from './screens/Home';

export default class PostView extends PureComponent {

    render() {
        let item = this.props.item;

        let screenWidth = Dimensions.get('window').width;
        let headerImageHeight = screenWidth/Home.HEADER_IMAGE_RATIO;
        let datePanelHeight = headerImageHeight * 0.15;
        let rowPaddingBottom = headerImageHeight * 0.05;
        
        let dateFontSize = 25;
        let captionFontSize = 23;
        if (Platform.OS === 'ios') {
            dateFontSize = 16;
            captionFontSize = 15;
        }

        var date = Moment(item[1]);
        var dateStr = Moment(date).format("DD/MM/YYYY");
        var postSrc = `${global.serverUrl}${item[6]}`;

        var type = item[4] == 1 ? "image" : "video";

        return (
            <View style={{
                paddingBottom: rowPaddingBottom
            }}>
                <View style={{ 
                    height: datePanelHeight,
                    backgroundColor: 'white',
                    flexDirection: 'column',
                    justifyContent: 'center'            
                }}>
                    <AppText style={{
                        textAlign: 'center',
                        fontSize: dateFontSize
                    }}>
                        {dateStr}
                    </AppText>
                    <Icon large color='black' name='md-more' type='ionicon'
                        containerStyle={{
                            position: 'absolute',
                            width: datePanelHeight*0.5,
                            height: datePanelHeight*0.5,
                            top: datePanelHeight*0.25,
                            right: datePanelHeight*0.25
                        }}
                        onPress={() => this.props.onPress()}
                    />
                </View>
                <AvView type={type} source={postSrc} />
                <View style={{
                    backgroundColor: 'white',
                    minHeight: datePanelHeight,
                    flexDirection: 'column',
                    justifyContent: 'center'    
                }}>
                    <AppText style={{
                        textAlign: 'center',
                        fontSize: captionFontSize,
                        margin: 5,
                    }}>
                        {item[5]}
                    </AppText>
                </View>
            </View>
        );
    }
}