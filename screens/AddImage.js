import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput} from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment, { now } from 'moment';

export default class AddImage extends Component {
    
    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button backgroundColor="transparent" title="Post"></Button>
        
    });

    constructor(props) {
        super(props);

        // get default date
        var nowDt = Moment();

        this.state = {
            caption: '',
            imageUri: this.props.navigation.state.params.imageUri,
            date: Moment(nowDt).format('DD/MM/YYYY')
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

                    <DatePicker
                        style={{width: 200}}
                        date={this.state.date}
                        mode="date"
                        placeholder="placeholder"
                        format="DD/MM/YYYY"
                        minDate="01/01/2017"
                        maxDate="01/01/2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconSource={require('../assets/icon_calendar.png')}
                        customStyles={{
                            dateText: {
                                fontSize: dateFontSize
                            }
                        }}
                        onDateChange={(date) => {this.setState({date: date});}}
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