import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, FlatList } from 'react-native';
import { Button} from 'react-native-elements';
import AppText from '../helpers/TextHelper'
import AppTextStyle from '../styles/AppTextStyle'
import AvView from '../AvView'

const data = [{
    id: 1,
    date_created: '22/01/2017',
    type: 'image',
    media_path: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/landscape.jpg',
    caption: "test caption"
  },
  {
    id: 2,
    date_created: '21/01/2017',
    type: 'image',
    media_path: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/snow.jpg',
    caption: "test caption 2"
  },
  {
    id: 3,
    date_created: '20/01/2017',
    type: 'image',
    media_path: 'https://github.com/saitoxu/InstaClone/raw/master/contents/images/town.jpg',
    caption: "test caption 3"
  },
]

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
            <FlatList
                style={styles.container}
                data={data}
                ListHeaderComponent={this.renderHeader}
                renderItem={({ item }) => (
                    <View>
                        <AvView type={item.type} source={item.media_path} />
                    </View>
                )}
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

        let tillAnniversaryPanelMarginTop = headerImageHeight*0.05;
        let tillAnniversaryPanelHeight = anniversaryDatePanelHeight*0.5;

        let anniMonth = 1; // start from 0 -> feb = 1
        let anniDay = 17;
        let anniYear = 2017;

        let anniDate = new Date(anniYear,anniMonth,anniDay);
        let todayDate = new Date();
        //Get 1 day in milliseconds
        let one_day=1000*60*60*24;
        // Convert both dates to milliseconds
        let date1_ms = anniDate.getTime();
        let date2_ms = todayDate.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // Convert back to days and return
        let daysTogether = Math.floor(difference_ms/one_day);

        let nextAnniDateYear = ((todayDate.getMonth() < anniMonth) || (todayDate.getMonth() == anniMonth && todayDate.getDate() <= anniDay)) ? todayDate.getFullYear() : todayDate.getFullYear() + 1;
        let nextAnniDate = new Date(nextAnniDateYear, anniMonth, anniDay);
        let date3_ms = todayDate.getTime();
        let date4_ms = nextAnniDate.getTime();
        difference_ms = date4_ms - date3_ms;
        let tillAnniDay = Math.ceil(difference_ms/one_day);

        let avatarNameFontSize = 30;
        let anniMonthFontSize = 22;
        let anniDayFontSize = 36;
        let anniCountFontSize = 64;
        let anniDaysTogetherLabelFontSize = 35;
        let tillAnniDayFontSize = 42;
        let tillAnniDayLabelFontSize = 30;

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
                    <View style={avatarStyles.avatarNameContainerLeft}><AppText style={avatarStyles.avatarName}>{leftName}</AppText></View>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg'}} style={avatarStyles.avatar} />
                    <Image source={{ uri: 'https://images.moviepilot.com/image/upload/c_fill,h_340,q_auto:good,w_460/b4yxwv7bffhfpc86clig.jpg'}} style={avatarStyles.avatar} />
                    <View style={avatarStyles.avatarNameContainerRight}><AppText style={avatarStyles.avatarName}>{rightName}</AppText></View>
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
                            <AppText style={{
                                fontSize: anniMonthFontSize,
                                color: 'white'
                            }}>
                            Th {anniMonth+1}
                            </AppText>
                        </View>
                        <View style={{
                            backgroundColor: 'white',
                            width: calendarWidth,
                            height: calendarHeight * 0.75,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AppText style={{
                                fontSize: anniDayFontSize,
                            }}>
                            {anniDay}
                            </AppText>
                        </View>
                    </View>

                    <View style={{
                        width: anniversaryDateRoundBackgroundSize*2.2,
                        height: anniversaryDatePanelHeight,

                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            height: 300,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                        }}>
                            <AppText style={{
                                fontSize: anniCountFontSize,
                                lineHeight: anniCountFontSize
                            }}>
                            {   daysTogether}
                            </AppText>
                        </View>
                        <View style={{
                            height: 300,
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}>
                            <AppText style={{
                                    fontSize: anniDaysTogetherLabelFontSize,
                                    marginTop: -anniDaysTogetherLabelFontSize/4

                                }}>
                                ngày bên nhau
                            </AppText> 
                        </View>

                    </View>

                </View>

                <View style={{
                                marginTop:tillAnniversaryPanelMarginTop,
                                height:tillAnniversaryPanelHeight,
                                backgroundColor: 'white',
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                    <AppText style={{
                            fontSize: tillAnniDayFontSize,
                        }}>
                        {tillAnniDay}
                    </AppText>
                    <AppText style={{
                            fontSize: tillAnniDayLabelFontSize,
                        }}>
                        {'  ngày đến lễ kỉ niệm'}
                    </AppText> 
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