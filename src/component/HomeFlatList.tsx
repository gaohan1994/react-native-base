/**
 * created by Ghan 2018.7.31
 */

import React, { Component, PureComponent } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/type';
import { NavigationScreenProp } from 'react-navigation';
import { mergeProps } from '../util/util';
import { common } from '../util/common';
import { 
    fetchNewsData, 
    HomeActions,
    changeNewsDataLoading,
} from '../action/home';
import { 
    getNewsList,
    getNewsLoading,
} from '../reducer/home';

/**
 * tabLabel -- react-native-scrollable-tab-view 渲染标题需要的字段
 * requestCode -- 请求接口需要的 code
 * navigation -- 父组件传来的 navigation
 * newsList -- 请求之后的数据存放在redux中
 * refreshing -- 刷新状态
 * fetchNewsData -- 请求数据
 * changeNewsDataLoading -- 修改loading状态
 * 
 * @interface Props
 */

interface Props {
    tabLabel?: string;
    requestCode: string;
    navigation?: NavigationScreenProp<any, any>;
    newsList?: any;
    refreshing?: boolean;
    fetchNewsData?: (code: string, page?: number) => void;
    changeNewsDataLoading?: (loading: boolean) => void;
}

/**
 * selected: 选中的条目
 *
 * @interface State
 */
interface State { 
    selected: Map<any, any>;
    flatHeight: number;
}

/**
 * 首页主显示长列表
 *
 * @class HomeFlatList
 * @extends {Component<Props, State>}
 */
class HomeFlatList extends Component<Props, State> {

    private currentPage = 0;

    constructor (props: Props) {
        super(props);
        this.state = {
            selected: new Map(),
            flatHeight: 0,
        };
    }

    componentDidMount() {
        this.fetchNewsList();
    }

    render () {
        const { newsList, requestCode, refreshing } = this.props;

        return (
            <View style={styles.container}>
                <FlatList
                    data={newsList[requestCode] || []}
                    renderItem={this._renderItem}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state.selected}
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    initialNumToRender={10}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.onEndReached}
                    onLayout={this.setFlatListHeight}
                    ListEmptyComponent={this.renderListEmptyComponent}
                />
            </View>
        );
    }

    /**
     * 渲染子组件函数
     * 
     * item: 每项数据
     *
     * @private
     * @memberof HomeFlatList
     */
    private _renderItem = ({ item }: any): JSX.Element => {
        // console.log('item: ', item);
        return (
            <FlatListItem 
                item={item}
                selected={!!this.state.selected.get(item.id)}
                onPressItem={this.onPressHandle}
            />
        );
    }
    
    /**
     * FlatList 为空时渲染的组件
     *
     * @private
     * @memberof HomeFlatList
     */
    private renderListEmptyComponent = (): JSX.Element => {
        const { flatHeight } = this.state;
        return (
            <View style={[common.center, {height: flatHeight}]}>

            </View>
        );
    }

    /**
     * 距离底部触发刷新
     *
     * @private
     * @memberof HomeFlatList
     */
    private onEndReached = (): void => {
        
        this.fetchNewsList();
    }

    private setFlatListHeight = (e: any): void => {
        const { height } = e.nativeEvent.layout;
        // console.log('e.nativeEvent: ', e.nativeEvent);
        if (this.state.flatHeight < height) {
            this.setState({
                flatHeight: height
            });
        }
    }

    /**
     * 请求数据函数
     *
     * @private
     * @memberof HomeFlatList
     */
    private fetchNewsList = (): void => {
        const { requestCode, fetchNewsData, refreshing } = this.props;
        if (fetchNewsData) {

            if (refreshing === true) {
                return;
            } else {

                fetchNewsData(requestCode, this.currentPage);

                this.currentPage += 10;
            }
        }
    }

    /**
     * 下拉刷新事件
     *
     * @private
     * @memberof HomeFlatList
     */
    private onRefresh = (): void => {
        const { changeNewsDataLoading } = this.props;
        
        if (changeNewsDataLoading) {

            this.currentPage = 0;

            this.fetchNewsList();
        }
    }

    /**
     * key 唯一
     *
     * @private
     * @memberof HomeFlatList
     */
    private keyExtractor = (item: any, index: number): string => index + '';

    /**
     * 点击事件
     *
     * @private
     * @memberof HomeFlatList
     */
    private onPressHandle = (id: string) => {
        this.setState((prevState) => {
            const selected = new Map(prevState.selected);
            selected.set(id, !selected.get(id));
            return { selected };
        });
    }
}

interface ItemProps {
    item: any;
    selected: boolean;
    onPressItem?: (id: string) => void;
}

/**
 * renderFlatList -- Item 纯组件
 * item -- 每项 ListItem 的数据
 * selected -- 该项 item 是否为选中状态
 * onPressItem -- 点击处理函数 外层传入
 *
 * @class FlatListItem
 * @extends {PureComponent<ItemProps, {}>}
 */
class FlatListItem extends PureComponent<ItemProps, {}> {
    render () {
        const { item, selected } = this.props;
        // console.log('item', item);
        return (
            <TouchableOpacity onPress={this.onPress}>
                <View>
                    <Text style={styles.text}>{item.title}</Text>
                    <Text style={{color: selected === true ? 'red' : 'black'}}>hello</Text>
                </View>
            </TouchableOpacity>
        );
    }

    private onPress = () => {
        const { item, onPressItem } = this.props;

        if (onPressItem) {
            onPressItem(item.id);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },

    text: {
        color: '#000000',
        fontSize: 17,
    },
});

const mapStateToProps = (state: Store) => ({
    newsList: getNewsList(state),
    refreshing: getNewsLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch<HomeActions>) => ({
    fetchNewsData: bindActionCreators(fetchNewsData, dispatch),
    changeNewsDataLoading: bindActionCreators(changeNewsDataLoading, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(HomeFlatList);