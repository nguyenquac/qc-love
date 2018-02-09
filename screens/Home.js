import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image, FlatList, ActivityIndicator, Alert, Platform} from 'react-native';
import { ImagePicker } from 'expo';
import { Button, Icon } from 'react-native-elements';
import AppText from '../helpers/TextHelper';
import AppTextStyle from '../styles/AppTextStyle';
import PostView from '../PostView';
import ActionSheet from 'react-native-actionsheet';
import Moment, { now } from 'moment';

var globalThis;

class Home extends Component {

    static HEADER_IMAGE_RATIO = 3/2;
    static PAGE_SIZE = 10;

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            page: 0,
            refreshing: false,
            needLoadMore: true,
            currentPostIndex: -1,
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
        let result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 1});
    
        if (!result.cancelled) {
            this.props.navigation.navigate('AddImage', { mode: 'add', imageUri: result.uri, imageWidth: result.width, imageHeight: result.height, homeScreen: this});
        }
    };

    reload = () => {
        if (!this.state.loading && !this.state.refreshing) {
            console.log("\nRELOADING\n");
            this.setState(
                {
                    data: [],
                    page: 1,
                    refreshing: true,
                },
                () => {
                    this.fetchPostsRequest();
                }
            );
        }
    }

    fetchPostsRequest = () => {
        console.log("\nFetch posts");
        const { page } = this.state;
        var pageSize = Home.PAGE_SIZE;
        const url = `${global.serverUrl}/api.php/post?order[]=date,desc&order[]=date_created,desc&page=${page},${pageSize}`;
        this.setState({ loading: true });
        
        setTimeout(() => {
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
                this.setState({ 
                    loading: false, 
                    refreshing: false,
                    page: this.state.page - 1 
                });
            });
        }, 1500);
    }

    handleLoadMore() {
        if (this.state.needLoadMore && !this.state.loading && !this.state.refreshing) {
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

    handlePostOption(index) {
        console.log(`Option for post ${index}`);
        this.setState({
            currentPostIndex: index
        });
        this.ActionSheet.show();
    }

    handleDeletePostPress() {
        var item = this.state.data[this.state.currentPostIndex];
        console.log(`Delete post id ${item[0]}`);
        const url = `${global.serverUrl}/api.php/post/${item[0]}?method=DELETE`;
        fetch(url, {
            method: 'get',
        })
        .then((response) => response.json())
        .then(responseJson => {
            console.log(`\n ${responseJson}`);
            
            try {
                var result = parseInt(responseJson);
                if (result > 0) {
                    // success
                    this.reload();
                    return;
                }
            }
            catch(err) {
                // failed
            }

            this.alertMiscError();
        })
        .catch((error) => {
            console.error(error);
            this.alertMiscError();

        });
    }

    handlePostOptionActionSheetPress(i) {
        if (i == 1) {
            // EDIT
            var item = this.state.data[this.state.currentPostIndex];
            var postImgSrc = `${global.serverUrl}${item[6]}`;
            var date = Moment(item[1]);
            var dateStr = Moment(date).format("DD/MM/YYYY");
            this.props.navigation.navigate('AddImage', { mode: 'edit', id:item[0], imageUri: postImgSrc, homeScreen: this, date: dateStr, caption: item[5], imageWidth: 0, imageHeight: 0});
        } else if (i == 2) {
            // DELETE
            Alert.alert('Confirm', 'Bạn có chắc chắn xóa hông?',
                [
                    {text: 'Hông', style: 'cancel'},
                    {text: 'Xoá lun', onPress: () => {this.handleDeletePostPress()}}
                ]
            );
        }
    }

    alertMiscError() {
        Alert.alert('','Đã có lỗi xảy ra, vui lòng thử lại sau.',[{text:'Ok'}]);
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.container}
                    data={this.state.data}
                    keyExtractor={(item, index) => index} 
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReached={this.handleLoadMore.bind(this)}
                    refreshing={this.state.refreshing}
                    onRefresh={this.reload}
                    renderItem={ ({item, index}) => <PostView item={item} onPress={() => this.handlePostOption(index)}/>}
                    initialNumToRender={3}
                />
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Action'}
                    options={['Cancel', 'Edit', 'Delete']}
                    cancelButtonIndex={0}
                    destructiveButtonIndex={2}
                    onPress={this.handlePostOptionActionSheetPress.bind(this)}
                />
            </View>
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
        let leftAvatar = require('../assets/avatar_quat.jpg');
        let rightAvatar = require('../assets/avatar_chanh.jpg');
        if (global.gender == 'female') {
            let tmpName = leftName;
            let tmpAvatar = leftAvatar;
            leftName = rightName;
            leftAvatar = rightAvatar;
            rightName = tmpName;
            rightAvatar = tmpAvatar;
        }

        let anniversaryDatePanelMarginTop = headerImageHeight*0.15;
        let anniversaryDatePanelHeight = avatarNamePanelHeight;

        let anniversaryDateRoundBackgroundSize = anniversaryDatePanelHeight*0.95;

        let calendarHeight = (anniversaryDateRoundBackgroundSize/2) * Math.cos(Math.PI/4.8) * 2;
        let calendarWidth = (anniversaryDateRoundBackgroundSize/2) * Math.sin(Math.PI/4.8) * 2;

        let tillAnniversaryPanelMarginTop = headerImageHeight*0.05;
        let tillAnniversaryPanelHeight = anniversaryDatePanelHeight*0.5;

        let anniMonth = global.anniMonth - 1; // start from 0 -> feb = 1
        let anniDay = global.anniDate;
        let anniYear = global.anniYear;

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

        let isAnniversary = (todayDate.getDate() == anniDay && todayDate.getMonth() == anniMonth);
        let numYear = todayDate.getFullYear() - anniYear;
        let numYearText = (numYear) > 1 ? `${numYear} years` : `1 year`;

        let avatarNameFontSize = 30;
        let anniMonthFontSize = 22;
        let anniDayFontSize = 36;
        let anniCountFontSize = 64;
        let anniDaysTogetherLabelFontSize = 35;
        let tillAnniDayFontSize = 42;
        let tillAnniDayLabelFontSize = 30;

        if (Platform.OS === 'ios') {
            avatarNameFontSize = 20;
            anniMonthFontSize = 12;
            anniDayFontSize = 23;
            anniCountFontSize = 28;
            anniDaysTogetherLabelFontSize = 18;
            tillAnniDayFontSize = 25;
            tillAnniDayLabelFontSize = 16;
        }

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
                        width: screenWidth,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        resizeMode: 'contain'
                    }}
                    source={require('../assets/cover.jpg')}
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
                    <Image source={leftAvatar} style={avatarStyles.avatar} />
                    <Image source={rightAvatar} style={avatarStyles.avatar} />
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

                { !isAnniversary ? (
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
                ) : (
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
                                fontSize: tillAnniDayLabelFontSize,
                                color: '#f92070'
                            }}>
                            {`Happy ${numYearText} anniversary!`}
                        </AppText> 
                    </View>
                )
                }

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