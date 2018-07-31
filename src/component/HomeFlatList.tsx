/**
 * created by Ghan 2018.7.31
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

/**
 * tabLabel -- react-native-scrollable-tab-view 渲染标题需要的字段
 * requestCode -- 请求接口需要的 code
 * navigation -- 父组件传来的 navigation
 */
interface Props {
    tabLabel?: string;
    requestCode?: string;
    navigation?: NavigationScreenProp<any, any>;
}

interface State { }

/**
 * 首页主显示长列表
 *
 * @class HomeFlatList
 * @extends {Component<Props, State>}
 */
class HomeFlatList extends Component<Props, State> {
    render () {
        // console.log('this.props', this.props);
        return (
            <View>
                <Text>
                    content
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default HomeFlatList;