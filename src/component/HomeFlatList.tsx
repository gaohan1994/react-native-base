/**
 * created by Ghan 2018.7.31
 */

import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/type';
import { NavigationScreenProp } from 'react-navigation';
import { fetchNewsData, HomeActions } from '../action/home';
import { mergeProps } from '../util/util';
import { getNewsList } from '../reducer/home';
/**
 * tabLabel -- react-native-scrollable-tab-view 渲染标题需要的字段
 * requestCode -- 请求接口需要的 code
 * navigation -- 父组件传来的 navigation
 */
interface Props {
    tabLabel?: string;
    requestCode: string;
    navigation?: NavigationScreenProp<any, any>;
    fetchNewsData?: (code: string, page?: number) => void;
    getNewsList?: Array<any>;
}

interface State { }

/**
 * 首页主显示长列表
 *
 * @class HomeFlatList
 * @extends {Component<Props, State>}
 */
class HomeFlatList extends Component<Props, State> {

    componentDidMount() {
        this.fetchNewsList();
    }

    render () {
        console.log('this.props', this.props);
        return (
            <View>
                <Text>
                    content
                </Text>
            </View>
        );
    }
    
    private fetchNewsList = () => {
        const { requestCode, fetchNewsData } = this.props;
        if (fetchNewsData) {
            fetchNewsData(requestCode, 0);
        }
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = (state: Store) => ({
    getNewsList: getNewsList(state),
});

const mapDispatchToProps = (dispatch: Dispatch<HomeActions>) => ({
    fetchNewsData: bindActionCreators(fetchNewsData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeFlatList);