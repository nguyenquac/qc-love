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
          dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        };
    }

    render() {
        let screenWidth = Dimensions.get('window').width;
        console.log(screenWidth);
        let headerImageRatio = 4/3;
        const Header = (props) => (
            <Image
                width={480}
                height={360}
                source={{uri:'http://f.imgs.vietnamnet.vn/2017/10/21/21/20171021210959-bao-tang-ha-noi.jpg'}}
            >

            </Image>
        );
        
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(data) => <View><Text>{data}</Text></View>}
                renderHeader={() => <Header />}
            />
        );
    }
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 12,
    },
    header: {
        flex: 1,
        backgroundColor:'transparent'
    },
    red: {
        color: 'red'
    }
  });