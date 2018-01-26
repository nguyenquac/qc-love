import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput} from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';

export default class AddImage extends Component {
    
    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button backgroundColor="transparent" title="Post"></Button>
        
    });

    constructor(props) {
        super(props);
        this.state = {
            caption: '',
            imageUri: this.props.navigation.state.params.imageUri,
            date: '24/01/2018'
        };
    }
    
    render() {

        let screenWidth = Dimensions.get('window').width;
        let imageSize = screenWidth/3;

        let dateRowHeight = screenWidth/8;
        let dateFontSize = 20;

        let captionTextFontSize = 20;

        return (
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Image source={{uri:this.state.imageUri}} resizeMode='contain' style={{
                        width:imageSize,
                        height:imageSize,
                        margin:10,
                    }}></Image>
                    <TextInput 
                        multiline={true}
                        placeholder="Caption"
                        style={{
                            width:screenWidth*2/3 - 20,
                            height:imageSize,
                            padding:10,
                            textAlignVertical: 'top',
                            fontSize: captionTextFontSize,
                        }}>
                    </TextInput>
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: '#bababa',
                }}>
                </View>
                <View style={{
                    height: dateRowHeight,
                    width: screenWidth,
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 20,
                }}>
                    <Text style={{
                        flex: 1,
                        fontSize: dateFontSize,
                        textAlignVertical: 'center',
                    }}>Ngày</Text>

                    <Text style={{
                        flex: 1,
                        fontSize: dateFontSize,
                        textAlign: 'right',
                        textAlignVertical: 'center',
                        padding: 10,
                    }}>{this.state.date}</Text>

                    <Avatar 
                        width={dateRowHeight*0.7} 
                        height={dateRowHeight*0.7} 
                        source={require('../assets/icon_calendar.png')}
                        overlayContainerStyle={{backgroundColor: 'transparent'}}
                    />
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: '#bababa',
                }}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flexDirection: 'column',
    }
  });