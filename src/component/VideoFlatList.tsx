/**
 * created by Ghan 2018.8.3
 */
import React from 'react';
import { 
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { fetchVideoData } from '../action/video';
import { getVideo, getVideoLoading } from '../reducer/video';

/**
 * common 
 */
import { defaultTheme, common } from '../util/common';
import { Store } from '../reducer/type';
import { mergeProps } from '../util/util';
import { bindActionCreators, Dispatch } from 'redux';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * tabLabel -- 外层需要的tabtitle
 * requestCode -- 请求数据的code
 * navigation -- 路由器
 * refreshing -- 刷新状态
 * fetchNewsData -- 请求数据
 */
interface Props {
    tabLabel?: string;
    requestCode: string;
    navigation: NavigationScreenProp<any, any>;
    refreshing?: boolean;
    videoList?: any;
    fetchVideoData?: (requestCode: string, page: number) => void;
}

/**
 * selected 是否选中状态
 */
interface State {
    selected: Map<any, any>;
    flatHeight: number;
}

/**
 * 视频内容页面
 *
 * @export
 * @class VideoFlatList
 * @extends {Component<Props, State>}
 */
class VideoFlatList extends React.Component<Props, State> {

    private currentPage = 0;

    constructor (props: Props) {
        super(props);
        this.state = {
            selected: new Map(),
            flatHeight: screenHeight - 68,
        };
    }

    componentDidMount() {
        const { requestCode, fetchVideoData  } = this.props;

        if (fetchVideoData) {
            fetchVideoData(requestCode, this.currentPage);    
        }
    }

    render () {
        const { videoList, requestCode, refreshing } = this.props;

        return (
            <View style={common.container}>
                <FlatList
                    data={videoList[requestCode] || []}
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
            <VideoListItem 
                item={item}
                selected={!!this.state.selected.get(item.replyid)}
                onPressItem={this.onPressHandle}
            />
        );
    }
    
    /**
     * FlatList 为空时渲染的组件
     *
     * @private
     * @memberof VideoFlatList
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
     * @memberof VideoFlatList
     */
    private onEndReached = (): void => {
        
        this.fetchVideoList();
    }

    private setFlatListHeight = (e: any): void => {
        const { height } = e.nativeEvent.layout;

        console.log('e.nativeEvent: ', e.nativeEvent);

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
     * @memberof fetchVideoList
     */
    private fetchVideoList = (): void => {
        const { requestCode, refreshing, fetchVideoData } = this.props;

        if (fetchVideoData) {
            if (refreshing === true) {
                return;
            } else {
                fetchVideoData(requestCode, this.currentPage);
    
                this.currentPage += 10;
            }
        }
    }

    /**
     * 下拉刷新事件
     *
     * @private
     * @memberof VideoFlatList
     */
    private onRefresh = (): void => {
        
        this.currentPage = 0;

        this.fetchVideoList();
    }

    /**
     * key 唯一
     *
     * @private
     * @memberof VideoFlatList
     */
    private keyExtractor = (item: any, index: number): string => index + '';

    /**
     * 点击事件
     *
     * @private
     * @memberof VideoFlatList
     */
    private onPressHandle = (item: {replyid: string}) => {
        console.log('item: ', item);
        this.setState((prevState) => {
            const selected = new Map(prevState.selected);
            selected.set(item.replyid, true);
            return { selected };
        });
    }
}

interface ItemProps {
    item: any;
    selected: boolean;
    onPressItem: (item: any) => void;
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
class VideoListItem extends React.Component <ItemProps, {}> {
    render () {
        const { 
            item,
            selected,
         } = this.props;
        return (
            <TouchableOpacity onPress={() => this.onPressHandle()}>
                <View style={styles.videoContainer}>
                    <ImageBackground
                        source={{uri: item.cover}}
                        resizeMode="cover"
                        style={[styles.videoBackgroundImage, common.center]}
                    >
                        <View style={styles.videoTitle}>
                            <Text style={styles.titleText}>{item.title || ''}</Text>
                        </View>
                        <View style={[styles.videoControl, common.center]}>
                            <Image
                                source={require('./../../assets/images/i_play.png')} 
                                resizeMode={'contain'}
                                style={styles.videoButton}  
                            />
                        </View>   
                    </ImageBackground>
                    <Text style={{color: selected === true ? 'red' : 'black'}}>{item.title || 'text'}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * 视频 item 点击动作
     *
     * @private
     * @memberof VideoListItem
     */
    private onPressHandle = () => {
        const { onPressItem, item } = this.props;

        if (onPressItem) {
            onPressItem(item);
        }
    }
}

const styles = StyleSheet.create({
    emptyImage: {
        width: 60,
        height: 60,
    },

    videoContainer: {
        flexDirection: 'column',
    },

    videoBackgroundImage: {
        height: 180,
        position: 'relative',
    },

    videoTitle: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: 10,
    },

    titleText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    videoControl: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },

    videoButton: {
        width: 18,
        height: 18,
        marginLeft: 3,
    }
});

const mapStateToProps = (state: Store) => ({
    videoList: getVideo(state),
    refreshing: getVideoLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchVideoData: bindActionCreators(fetchVideoData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(VideoFlatList);