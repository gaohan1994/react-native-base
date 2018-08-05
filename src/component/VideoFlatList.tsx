/**
 * created by Ghan 2018.8.3
 */
import React, { Component } from 'react';
import { 
    Text,
    View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
/**
 * react-redux
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/type';
import { mergeProps } from '../util/util';
import { fetchVideoData } from '../action/video';
import { Dispatch, Action } from '../action/type';

/**
 * tabLabel -- 外层需要的tabtitle
 * requestCode -- 请求数据的code
 * navigation -- 路由器
 */
interface Props {
    tabLabel?: string;
    dispatch?: Dispatch;
    requestCode: string;
    navigation: NavigationScreenProp<any, any>;
}

interface State {}

/**
 * 视频内容页面
 *
 * @export
 * @class VideoFlatList
 * @extends {Component<Props, State>}
 */
export class VideoFlatList extends Component <Props, State> {

    private currentPage = 0;

    componentDidMount() {
        const { dispatch, requestCode } = this.props;
        console.log(this.props);
        if (dispatch) {
            dispatch(fetchVideoData(requestCode, this.currentPage));
        }
    }

    render() {
        return (
            <View>
                <Text> VideoFlatList </Text>
            </View>
        );
    }
}
const mapStateToProps = (state: Store) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoFlatList);