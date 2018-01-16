import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions, Image } from 'react-native';
import { Button} from 'react-native-elements';

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
        let avatarRadius = avatarNamePanelHeight * 1.2;
        let avatarNamePanelMarginTop = (avatarRadius - avatarNamePanelHeight)/2;

        const avatarStyles = StyleSheet.create({
            avatar: {
                height: avatarRadius,
                width: avatarRadius,
                borderRadius: avatarRadius/2,
                marginLeft: 5,
                marginRight: 5,
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
                    marginTop: headerImageHeight - avatarRadius - headerImageHeight*0.1,
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
                    <Text style={styles.avatarName}>boy</Text>
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg'}} style={avatarStyles.avatar} />
                    <Image source={{ uri: 'https://images.moviepilot.com/image/upload/c_fill,h_340,q_auto:good,w_460/b4yxwv7bffhfpc86clig.jpg'}} style={avatarStyles.avatar} />
                    <Text style={styles.avatarName}>girl</Text>
                </View>
                <View style={{
                                marginTop:50,
                                height:80,
                                backgroundColor: 'white',
                            }}>

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
    avatar: {
        height: 100,
        width: 100,
        borderRadius: 50,
        margin: 5,
    },
    avatarName: {
        padding: 20,
    },
    red: {
        color: 'red'
    }
  });