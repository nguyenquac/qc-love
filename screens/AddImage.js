import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, ActivityIndicator, Alert} from 'react-native';
import { Button, Icon, Avatar } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import Moment, { now } from 'moment';
import { ImageManipulator } from 'expo';

export default class AddImage extends Component {
    
    constructor(props) {
        super(props);

        var date = '';
        var caption = '';
        if (this.props.navigation.state.params.mode == 'add') {
            // get default date
            var nowDt = Moment();
            date = Moment(nowDt).format('DD/MM/YYYY');
        } else {
            date = this.props.navigation.state.params.date;
            caption = this.props.navigation.state.params.caption;
        }
        

        this.state = {
            caption: caption,
            imageUri: this.props.navigation.state.params.imageUri,
            imageWidth: this.props.navigation.state.params.imageWidth,
            imageHeight: this.props.navigation.state.params.imageHeight,
            date: date
        };
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        var title = (params.mode == 'add') ? 'Post' : 'Update';
        let headerRight = (
          <Button backgroundColor="transparent" title={title} onPress={params.handlePost ? params.handlePost : () => null}></Button>
        );
        if (params.isPosting) {
          headerRight = <ActivityIndicator />;
        }
        return { headerRight };
    };

    componentDidMount() {
        this.props.navigation.setParams({ handlePost: this._handlePost });
    }

    _handlePost = async () => {
        // Update state, show ActivityIndicator
        this.props.navigation.setParams({ isPosting: true });
        
        if (this.props.navigation.state.params.mode == 'add') {
            // INSERT
            const data = new FormData();

            // date created
            var date = Moment(this.state.date, "DD/MM/YYYY");
            data.append('date', Moment(date).format("YYYY-MM-DD"));

            // user created
            data.append('user_created', global.username);

            // caption
            data.append('caption', this.state.caption);

            // type
            data.append('type', 1);

            // image
            if (this.state.imageWidth > 1080)
            {
                const manipResult = await ImageManipulator.manipulate(
                    this.state.imageUri,
                    [{resize: {width: 1080}}],
                );
                this.state.imageUri = manipResult.uri;

            }

            let uriParts = this.state.imageUri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            data.append('upfile', {
                uri: this.state.imageUri,
                type: `image/${fileType}`,
                name: `testPhotoName.${fileType}`
            });

            // REQUEST POST
            let url = `${global.serverUrl}/createpost.php`;
            fetch(url, {
                method: 'post',
                body: data
            })
            .then((response) => response.json())
            .then(responseJson => {
                this.props.navigation.setParams({ isPosting: false});
                
                try {
                    var result = parseInt(responseJson);
                    if (result > 0) {
                        // success
                        this.props.navigation.state.params.homeScreen.reload();
                        this.props.navigation.goBack();
                        return;
                    }
                }
                catch(err) {
                    // failed
                }

                this._alertPostError();
            })
            .catch((error) => {
                this.props.navigation.setParams({ isPosting: false});
                //console.error(error);
                this._alertPostError();

            });
        }
        else {
            // UPDATE
            const data = new FormData();

            // date created
            var date = Moment(this.state.date, "DD/MM/YYYY");
            data.append('date', Moment(date).format("YYYY-MM-DD"));

            // caption
            data.append('caption', this.state.caption);

            // REQUEST PUT
            let url = `${global.serverUrl}/api.php/post/${this.props.navigation.state.params.id}`;
            fetch(url, {
                method: 'put',
                body: data
            })
            .then((response) => response.json())
            .then(responseJson => {
                console.log(`\n ${responseJson}`);
                this.props.navigation.setParams({ isPosting: false});
                
                try {
                    var result = parseInt(responseJson);
                    if (result > 0) {
                        // success
                        this.props.navigation.state.params.homeScreen.reload();
                        this.props.navigation.goBack();
                        return;
                    }
                }
                catch(err) {
                    // failed
                }

                this._alertPostError();
            })
            .catch((error) => {
                this.props.navigation.setParams({ isPosting: false});
                console.error(error);
                this._alertPostError();

            });
        }
        
    }
    
    _alertPostError = () => {
        Alert.alert('','Đã có lỗi xảy ra, vui lòng thử lại sau.',[{text:'Ok'}]);
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
                        }}
                        onChangeText={(caption) => this.setState({caption})}
                        value={this.state.caption}
                    />
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