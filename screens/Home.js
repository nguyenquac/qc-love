import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, FlatList, ActivityIndicator } from 'react-native';
import { ImagePicker } from 'expo';
import { Button, Icon } from 'react-native-elements';
import AppText from '../helpers/TextHelper'
import AppTextStyle from '../styles/AppTextStyle'
import AvView from '../AvView'
import Moment, { now } from 'moment';

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

var globalThis;

class Home extends Component {

    static HEADER_IMAGE_RATIO = 3/2;
    static PAGE_SIZE = 20;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            page: 0,
            refreshing: false,
            needLoadMore: true,
        };
    }

    componentWillMount() {
        globalThis = this;
    }

    static navigationOptions = ({ navigation }) => ({
        headerRight: <Icon large color='white' name='add' onPress={() => globalThis.onAddImageFromLibraryPress()}></Icon>,
        headerLeft: <Icon large color='white' name='toc'></Icon>,
    });

    onAddImageFromLibraryPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true});
    
        if (!result.cancelled) {
            this.props.navigation.navigate('AddImage', { imageUri: result.uri, imageWidth: result.width, imageHeight: result.height, homeScreen: this});
        }
    };

    reload = () => {
        console.log("\nRELOADING\n");
    }

    fetchPostsRequest = () => {
        console.log("\nFetch posts");
        const { page } = this.state;
        var pageSize = Home.PAGE_SIZE;
        const url = `${global.serverUrl}/api.php/post?order=date_created,desc&page=${page},${pageSize}`;
        console.log(url);
        this.setState({ loading: true });
        fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res.post.records);
            this.setState({
                data: page === 1 ? res.post.records : [...this.state.data, ...res.post.records],
                loading: false,
                refreshing: false,
                needLoadMore: res.post.records.length < Home.PAGE_SIZE ? false : true,
            });
        })
        .catch(error => {
            console.log(error);
            this.setState({ loading: false, page: this.state.page - 1 });
        });
    }

    handleLoadMore() {
        if (this.state.needLoadMore) {
            console.log('\nLoad more');
            this.setState(
                {
                    page: this.state.page + 1
                },
                () => {
                    this.fetchPostsRequest();
                }
            );
        }
    }

    _renderPostItem(item){

        let screenWidth = Dimensions.get('window').width;
        let headerImageHeight = screenWidth/Home.HEADER_IMAGE_RATIO;
        let datePanelHeight = headerImageHeight * 0.15;
        let rowPaddingBottom = headerImageHeight * 0.05;
        
        let dateFontSize = 25;
        let captionFontSize = 20;

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
                    }}></Icon>
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
                        fontSize: captionFontSize
                    }}>
                        {item[5]}
                    </AppText>
                </View>
            </View>
        );
    }

    render() {
        return (
            <FlatList
                style={styles.container}
                data={this.state.data}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter.bind(this)}
                onEndReached={this.handleLoadMore.bind(this)}
                renderItem={ ({item}) => this._renderPostItem(item)}
            />
        );
    };

    renderHeader() {

        let screenWidth = Dimensions.get('window').width;
        let headerImageHeight = screenWidth/Home.HEADER_IMAGE_RATIO;
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
                        height: headerImageHeight,
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

                <View style={{
                    height:tillAnniversaryPanelMarginTop,
                    backgroundColor:'transparent'
                }}></View>

            </View>
        )
    }

    renderFooter() {
        if (!this.state.loading) return null;

        return (
            <View
              style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
        );
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