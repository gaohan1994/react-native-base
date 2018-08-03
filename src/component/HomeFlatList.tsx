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
    Image,
    ImageBackground,
    Dimensions,
    TextStyle
} from 'react-native';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/type';
import { NavigationScreenProp } from 'react-navigation';
import { mergeProps } from '../util/util';
import { common, defaultTheme } from '../util/common';
import { 
    fetchNewsData, 
    HomeActions,
    changeNewsDataLoading,
} from '../action/home';
import { 
    getNewsList,
    getNewsLoading,
} from '../reducer/home';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface TextProps {
    selected?: boolean;
    size?: 'normal' | 'small';
    style?: TextStyle;
    children: any;
}

/**
 * MyText 组件
 * 
 * text --- 渲染内容
 * selected --- 是否是选中状态
 * size --- 字体大小 normal: 14 small 12
 * style --- 其他样式
 * 
 * @param param0 
 */
const MyText = ({
    children,
    selected = false,
    size = 'normal',
    style = {},
    ...rest
}: TextProps): JSX.Element => {
    return (
        <Text
            {...rest}
            style={[
                styles.text,
                style,
                { 
                    color: selected === true ? defaultTheme.selectedFontColor : defaultTheme.fontColor,
                    fontSize: size === 'small' 
                        ? defaultTheme.smallFont
                        : defaultTheme.normalFont
                }
            ]}
        >
            {children}
        </Text>
    );
};

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
                <Image 
                    source={require('./../../assets/images/list_placeholder.png')} 
                    resizeMode={'contain'}
                    style={styles.emptyImage}
                />
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
            selected.set(id, true);
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
        
        /**
         * 判断布局形式
         * 
         * isThreePic -- 三图布局
         * 
         * isVideo -- 视频布局
         * 
         * other -- 默认布局
         */
        const isThreePic = item.imgnewextra;

        const isVideo = item.videoinfo;

        if (isThreePic) {
            return (
                <TouchableOpacity 
                    onPress={() => this.onPress()}
                    style={[styles.item]}
                >
                    <View style={styles.picContainer}>
                        <MyText selected={selected} >{item.title}</MyText>

                        <View style={styles.picsBox}>
                            <Image
                                source={{uri: item.imgsrc}}
                                style={[styles.itemImage, { width: screenWidth * 0.32 }]} 
                            />
                            {
                                item.imgnewextra.map((img: {imgsrc: string}, index: number) => (
                                    <Image
                                        key={index}
                                        resizeMode="cover"
                                        source={{uri: img.imgsrc}}
                                        style={[styles.itemImage, { width: screenWidth * 0.32 }]} 
                                    />
                                ))
                            }
                        </View>

                        <View style={styles.textBox}>
                            <View style={[styles.textContent, common.center]}>
                                <MyText selected={true} size="small" >{item.source}</MyText>
                                <MyText selected={true} size="small" >{item.replyCount}人跟帖</MyText>
                            </View>
                            <MyText selected={true} size="small" >x</MyText>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        if (isVideo) {
            return (
                <TouchableOpacity 
                    onPress={() => this.onPress()}
                    style={[styles.item]}    
                >
                    <View style={styles.picContainer}>
                        <MyText selected={selected} >{item.title}</MyText>

                        <View style={styles.picsBox}>
                            <ImageBackground
                                source={{uri: item.imgsrc}}
                                resizeMode="cover"
                                style={[styles.videoImage, common.center]} 
                            >
                                <View style={[styles.videoControl, common.center]}>
                                    <Image 
                                        source={require('./../../assets/images/i_play.png')} 
                                        resizeMode={'contain'}
                                        style={styles.videoButton}    
                                    />
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={styles.textBox}>
                            <View style={[styles.textContent, common.center]}>
                                <MyText selected={true} size="small" >{item.source}</MyText>
                                <MyText selected={true} size="small" >{item.replyCount}人跟帖</MyText>
                            </View>
                            <MyText selected={true} size="small" >x</MyText>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity 
                onPress={() => this.onPress()}
                style={[styles.item, styles.defaultContainer]}    
            >
                <View
                    style={[styles.picContainer, styles.defaultBox, { width: screenWidth * 0.6 }]}
                >
                    <MyText selected={selected} >{item.title}</MyText>
                    <View style={styles.textBox}>
                        <View style={[styles.textContent, common.center]}>
                            <MyText selected={true} size="small" >{item.source}</MyText>
                            <MyText selected={true} size="small" >{item.replyCount}人跟帖</MyText>
                        </View>
                        <MyText selected={true} size="small" >x</MyText>
                    </View>
                </View>
                <Image
                    resizeMode="cover"
                    source={{uri: item.imgsrc}}
                    style={[styles.itemImage, { width: screenWidth * 0.32 }]} 
                />
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

    emptyImage: {
        width: 60,
        height: 60,
    },

    item: {
        backgroundColor: defaultTheme.defaultBackgroundColor,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        padding: 7,
    },

    defaultContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    picContainer: {
        flexDirection: 'column',
    },

    picsBox: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    itemImage: {
        height: 80,
    },

    textBox: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    textContent: {
        flexDirection: 'row',
    },

    text: {
        marginRight: 6,
    },

    videoImage: {
        height: 180,
        flex: 1,
        marginVertical: 6,
    },

    videoControl: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, .5)',
    },

    videoButton: {
        width: 18,
        height: 18,
        marginLeft: 3,
    },

    defaultBox: {
        justifyContent: 'space-between',
    }
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