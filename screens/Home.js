import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image } from 'react-native';
import { Button} from 'react-native-elements';

import AppTextStyle from '../styles/AppTextStyle'

class Home extends Component {

    handleSettingsPress = () => {
        this.props.navigation.navigate('Scr1');
    };

    constructor(props) {
        super(props);
    
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
          dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3']),
        };
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Text>{data}</Text></View>}
                renderHeader={this.renderHeader}
            />
        );
    };

    renderHeader() {

        let screenWidth = Dimensions.get('window').width;
        let headerImageRatio = 3/2;
        let headerImageHeight = screenWidth/headerImageRatio;
        let avatarNamePanelHeight = headerImageHeight * 0.3;
        let avatarDiameter = avatarNamePanelHeight * 1.2;
        let avatarNamePanelMarginTop = (avatarDiameter - avatarNamePanelHeight)/2;

        let heartIconSize = avatarDiameter/5;
        let heartIconTop = (avatarDiameter - heartIconSize)/2;
        let heartIconLeft = (screenWidth - heartIconSize)/2;

        let leftName = 'Quất';
        let rightName = 'Chanh';

        let anniversaryDatePanelMarginTop = headerImageHeight*0.15;
        let anniversaryDatePanelHeight = avatarNamePanelHeight;

        let anniversaryDateRoundBackgroundSize = anniversaryDatePanelHeight*0.95;

        let calendarHeight = (anniversaryDateRoundBackgroundSize/2) * Math.cos(Math.PI/4.8) * 2;
        let calendarWidth = (anniversaryDateRoundBackgroundSize/2) * Math.sin(Math.PI/4.8) * 2;

        let anniMonth = 2;
        let anniDay = 17;
        let daysTogether = 365;

        let avatarNameFontSize = 20;
        let anniMonthFontSize = 14;
        let anniDayFontSize = 24;
        let anniCountFontSize = 42;
        let anniDaysTogetherLabelFontSize = 26;

        const avatarStyles = StyleSheet.create({
            avatar: {
                height: avatarDiameter,
                width: avatarDiameter,
                borderRadius: avatarDiameter/2,
                marginLeft: 2,
                marginRight: 2,
            },
            avatarNameContainerLeft: {
                width: 100,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginRight: 10
            },
            avatarNameContainerRight: {
                width: 100,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginLeft: 10,
            },
            avatarName: {
                fontSize: avatarNameFontSize,
                color: "#474747",
                fontWeight: 'bold'
            },
        });

        return (
            <View style={styles.container}>
                <Image
                    style={{
                        backgroundColor:'transparent',
                        height: screenWidth/headerImageRatio,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                    }}
                    source={{uri:'http://vanhien.vn/uploads/news/2014/11/khue-van-cac.jpg'}}
                >
                </Image>
                <View style={{
                    marginTop: headerImageHeight - avatarDiameter - headerImageHeight*0.1,
                    backgroundColor: 'transparent',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                                    height:avatarNamePanelHeight,
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                    position: 'absolute',
                                    top: avatarNamePanelMarginTop,
                                    left: 0,
                                    right: 0
                                }}>
                    </View>
                    <View style={avatarStyles.avatarNameContainerLeft}><Text style={AppTextStyle.appText}><Text style={avatarStyles.avatarName}>{leftName}</Text></Text></View>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg'}} style={avatarStyles.avatar} />
                    <Image source={{ uri: 'https://images.moviepilot.com/image/upload/c_fill,h_340,q_auto:good,w_460/b4yxwv7bffhfpc86clig.jpg'}} style={avatarStyles.avatar} />
                    <View style={avatarStyles.avatarNameContainerRight}><Text style={AppTextStyle.appText}><Text style={avatarStyles.avatarName}>{rightName}</Text></Text></View>
                    <Image source={require('../assets/heart-stroke.png')}
                        style={{
                            position: 'absolute',
                            height: heartIconSize,
                            width: heartIconSize,
                            top: heartIconTop,
                            left: heartIconLeft
                        }}
                    />
                </View>

                <View style={{
                                marginTop:anniversaryDatePanelMarginTop,
                                height:anniversaryDatePanelHeight,
                                backgroundColor: 'white',
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                    <View style={{
                        width: anniversaryDateRoundBackgroundSize,
                        height: anniversaryDateRoundBackgroundSize,
                        borderRadius: anniversaryDateRoundBackgroundSize/2,
                        backgroundColor: '#a3ffd4',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            backgroundColor: '#ff325b',
                            width: calendarWidth,
                            height: calendarHeight * 0.25,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: anniMonthFontSize,
                                color: 'white'
                            }}>
                            Th {anniMonth}
                            </Text>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            width: calendarWidth,
                            height: calendarHeight * 0.75,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontSize: anniDayFontSize,
                                color: '#1e1e1e',
                                fontWeight: 'bold'
                            }}>
                            {anniDay}
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        width: anniversaryDateRoundBackgroundSize*2.2,
                        height: anniversaryDatePanelHeight,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                       <Text style={{
                                fontSize: anniCountFontSize,
                                lineHeight: anniCountFontSize * 0.92,
                                color: '#1e1e1e',
                                fontWeight: 'bold',
                            }}>
                            {daysTogether}
                        </Text>
                        <Text style={{
                                fontSize: anniDaysTogetherLabelFontSize,
                                color: '#1e1e1e',
                            }}>
                            ngày bên nhau
                        </Text> 
                    </View>

                </View>
            </View>
        )
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(205,205,205)',
    },
    red: {
        color: 'red'
    }
  });