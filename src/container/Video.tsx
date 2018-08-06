/**
 * created by Ghan 2018.7.31
 */
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';

import { NavigationScreenProp } from 'react-navigation';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import VideoFlatList from '../component/VideoFlatList';
import { isLT19 } from '../util/util';
import { DispatchType } from '../action/type';
// import Bar from '../component/Layout';

/**
 * 获得手机尺寸
 */
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props { 
    navigation: NavigationScreenProp<any, any>;
    dispatch: DispatchType;
}

interface State { }

/**
 * 视频分类页面
 *
 * @class Video
 * @extends {React.Component<Props, State>}
 */
class Video extends React.Component <Props, State> {

    tabArr = [
        {columnName: '娱乐', requestCode: 'V9LG4CHOR'},
        {columnName: '搞笑', requestCode: 'V9LG4E6VR'},
        {columnName: '精品', requestCode: '00850FRB'},
        // {columnName: '音乐', requestCode: 'home'},
        // {columnName: '现场', requestCode: 'home'},
        // {columnName: '黑科技', requestCode: 'home'},
        // {columnName: '小品', requestCode: 'home'},
        // {columnName: '萌物', requestCode: 'home'},
        // {columnName: '猎奇', requestCode: 'home'},
        // {columnName: '军武', requestCode: 'home'},
        // {columnName: '涨姿势', requestCode: 'home'}
    ];

    render (): React.ReactNode {
        console.log('video props', this.props);
        return (
            <View style={styles.container}>
                {/* 状态栏 */}
                <StatusBar 
                    barStyle="dark-content"
                    // backgroundColor={'rgba(0, 255, 255, 0)'} 
                    translucent={true} 
                    animated={true}
                />

                {/* 主要部分 */}
                <View style={styles.container}>

                    {/* 固定标签 */}
                    <View style={styles.columnSelect}>
                        <Image source={require('./../../assets/images/i_search_grey.png')} style={{width: 16, height: 16}} />
                    </View>

                    <ScrollableTabView
                        renderTabBar={() => (
                            <ScrollableTabBar 
                                style={{
                                    borderBottomWidth: 0, 
                                    paddingBottom: 5, 
                                    width: screenWidth * 0.9, 
                                    height: 45
                                }}
                            />
                        )}
                        tabBarUnderlineStyle={{ height: 2, backgroundColor: 'rgba(216, 30, 6, .8)' }}
                        tabBarInactiveTextColor="#515151"
                        tabBarActiveTextColor="#d81e06"
                        tabBarTextStyle={{fontSize: 15}}
                        locked={false}
                        initialPage={0}
                    >
                        {
                            this.tabArr.map((item) => (
                                <VideoFlatList
                                    key={item.columnName}
                                    tabLabel={item.columnName}
                                    requestCode={item.requestCode}
                                    navigation={this.props.navigation}
                                />
                            ))
                        }
                    </ScrollableTabView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative',
        paddingTop: isLT19() ? 0 : 10,
    },

    columnSelect: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.1,
        height: 50,
        top: isLT19() ? 0 : 10,
        right: 0,
    }
});

export default Video;