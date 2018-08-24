import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { NavigationScreenProp } from 'react-navigation';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { isLT19 } from '../util/util';
import { defaultTheme } from '../util/common';
import HomeFlatList from '../component/HomeFlatList';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

interface State { }

class Home extends React.Component <Props, State> {

    tabArr = [
        {columnName: '头条', requestCode: 'T1348647909107'},
        {columnName: '娱乐', requestCode: 'T1348648517839'},
        {columnName: '科技', requestCode: 'T1348649580692'},
        {columnName: '手机', requestCode: 'T1348649654285'},
        {columnName: '冰雪运动', requestCode: 'T1486979691117'},
        {columnName: '云课堂', requestCode: 'T1421997195219'},
        {columnName: '游戏', requestCode: 'T1348654151579'},
        {columnName: '旅游', requestCode: 'T1348654204705'},
        {columnName: '二次元', requestCode: 'T1481105123675'},
        {columnName: '轻松一刻', requestCode: 'T1350383429665'},
        {columnName: '体育', requestCode: 'T1348649079062'}
    ];

    swiperData = [
        '华为不看好5G',
        '陶渊明后人做主播',
        '尔康制药遭处罚',
        '卢恩光行贿一案受审',
        '盖茨力挺扎克伯格',
        '大连特大刑事案件',
        '高校迷香盗窃案',
        '少年被批评后溺亡',
        '北京工商约谈抖音'
    ];

    render (): React.ReactNode {
        
        const { navigation } = this.props;

        return (
            <View style={styles.container}>

                <StatusBar 
                    barStyle="light-content"
                    backgroundColor={'rgba(255, 255, 255, 0)'} 
                    translucent={true} 
                    animated={true}
                />

                {/* 头部 */}
                <View style={styles.headerContaier}>
                    {/* 网易 Icon */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { Alert.alert('logo'); }}
                    >
                        <Image 
                            source={require('./../../assets/images/logo.png')} 
                            resizeMode={'contain'}
                            style={styles.headerLogo}    
                        />
                    </TouchableOpacity>

                    {/* Header search contaienr */}
                    <View style={styles.headerSearchContainer}>
                        <Swiper
                            horizontal={false}
                            autoplay={true}
                            showsPagination={false}
                            scrollEnabled={false}
                        >
                            {
                                this.swiperData.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={1}
                                            style={styles.swiperItem}
                                            onPress={() => {navigation.push('NewsSearch', { keyword: item }); }}
                                        >
                                            <Image
                                                source={require('./../../assets/images/i_search.png')} 
                                                resizeMode={'contain'} 
                                                style={styles.headerSearchImg}
                                            />
                                            <Text style={styles.headerSearchText}>{item}</Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </Swiper>
                    </View>

                    {/* 24 Icon */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { Alert.alert('logo'); }}
                    >
                        <Image 
                            source={require('./../../assets/images/i_24h.png')} 
                            resizeMode={'contain'}
                            style={styles.headerLogo}    
                        />
                    </TouchableOpacity>
                </View>
                {/* 头部结束 */}

                {/* container begin */}
                <View style={styles.container}>
                    {/* 固定标签 */}
                    <View style={styles.columnSelect}>
                        <Image source={require('./../../assets/images/i_menu.png')} style={{width: 20, height: 20}} />
                    </View>

                    <ScrollableTabView
                        renderTabBar={() => (
                            <ScrollableTabBar 
                                style={{
                                    borderBottomWidth: 0, 
                                    paddingBottom: 0, 
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
                                <HomeFlatList
                                    key={item.columnName}
                                    tabLabel={item.columnName}
                                    requestCode={item.requestCode}
                                    navigation={this.props.navigation}
                                />
                            ))
                        }
                    </ScrollableTabView>
                </View>
                {/* container over */}
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative'
    },
    headerContaier: {
        flexDirection: 'row',
        backgroundColor: defaultTheme.themeRed,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 68,
        paddingTop: isLT19() ? 0 : 25,
        paddingBottom: 5
    },
    headerLogo: {
        width: 33,
        height: 33,
    },
    headerSearchContainer: {
        width: screenWidth * 0.7,
        height: 33,
        borderRadius: 18,
        backgroundColor: 'rgba(255, 255, 255, .3)',
    },
    swiperItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerSearchImg: {
        width: 18,
        height: 18,
        marginRight: 5,
    },
    headerSearchText: {
        color: '#f8f8f8',
    },
    columnSelect: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth * 0.1,
        height: 50,
        top: 0,
        right: 0,
    }
});

export default Home;