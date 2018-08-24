/**
 * created by Ghan 2018.7.31
 * 首页
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    findNodeHandle,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';

import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../../reducer/index';
import { NavigationScreenProp } from 'react-navigation';
import { mergeProps } from '../../util/util';
import { DispatchType } from '../../action/type';
import { 
    saveSearchHistoryItem, 
    emptySearchHistoryItems, 
    SearchActions
} from '../../action/search';
import { getHistory, HistoryType, HistoryItem } from '../../reducer/search';
import { styles as HomeStyles } from '../Home';
import { common, defaultTheme } from '../../util/common';
import TextInput from '../../component/MyTextInput';
import Dialog from '../../class/dialogUtil';
import TextView from '../../component/TextView';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

/**
 * @param navigation 导航器
 * @param saveSearchHistoryItem 增加搜索历史条目
 * @param emptySearchHistoryItems 清空搜索历史
 * 
 * @interface Props
 */
interface Props {
    dispatch: Dispatch & DispatchType;
    navigation: NavigationScreenProp<any, any>;
    saveSearchHistoryItem: (item: string | object) => void;
    emptySearchHistoryItems: () => void;
    history: HistoryType;
}

interface State {
    value: string;
}

const hotList = [
    {keyword: '景甜妈妈 张继科'},
    {keyword: '星巴克关闭店面'},
    {keyword: '魅族内讧'},
    {keyword: '老布什夫人去世'},
    {keyword: '5G争夺白热化'},
    {keyword: '美国客机迫降'},
    {keyword: '绿军2-0雄鹿'},
    {keyword: '记者暗访遭扣押'},
    {keyword: '电子身份证来了'},
    {keyword: '少年被批评后溺亡'}
];

class Search extends React.Component <Props, State> {

    private timer: any;

    private scrollRef: any;

    private textInput: any;
    
    constructor (props: Props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        //
    }

    /**
     * 输入事件监听
     *
     * @memberof Search
     */
    public onChangeValue = (value: string): void => {
        this.setState({
            value: value
        });
    }

    /**
     * 点击取消
     *
     * @memberof Search
     */
    public onPressHandle = (): void => {
        const { navigation } = this.props;
        navigation.goBack();
    }

    /**
     * 清空搜索历史
     *
     * @memberof Search
     */
    public onEmptyHistoryHandle = (): void => {
        this.props.emptySearchHistoryItems();
    }

    /**
     * 点击热门搜索
     *
     * @param item { keyword: string }
     * 
     * @memberof Search
     */
    public doSearchHandle = (item: HistoryItem): void => {
        const { saveSearchHistoryItem } = this.props;

        saveSearchHistoryItem(item);
    }

    /**
     * 用户输入信息搜索
     *
     * @memberof Search
     */
    public doInputSearchHandle = (text: string): void => {
        const historyItem = {
            keyword: text
        };

        const { saveSearchHistoryItem } = this.props;
        saveSearchHistoryItem(historyItem);
    }

    /**
     * @param refName 点击的 textinput ref
     *
     * @memberof Search
     */
    public onFocusHandle = (refName: any) => {
        console.log('refName: ', refName);
        // 如果是 ios 处理一下
        if (Platform.OS === 'ios') {
            if (this.timer) {
                console.log('timer ex');
                clearTimeout(this.timer);
            } 

            // this.timer = setTimeout(() => {
            //     console.log('this[refName]: ', this[refName]);
            //     const scrollResponder = this.scrollRef.getScrollResponder();
            //     scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            //         findNodeHandle(this[refName]),
            //         130,
            //         true
            //     );
            // }, 100);
        }
    }

    render (): React.ReactNode {
        const { value } = this.state;

        const { history } = this.props;
        return (
            <View style={common.container}>
                <StatusBar
                    barStyle="dark-content"
                    translucent={true} 
                    animated={true}
                />

                {/* 搜索输入框 */}
                <View style={[HomeStyles.headerContaier, { backgroundColor: defaultTheme.defaultBackgroundColor }]}>
                    <View style={styles.inputBox}>        
                        <Image 
                            source={require('../../../assets/images/i_search_grey.png')} 
                            style={HomeStyles.headerSearchImg}
                            resizeMode="contain"
                        />
                        <TextInput
                            style={styles.input}
                            value={value}
                            onChangeText={(text) => this.onChangeValue(text)}
                            multiline = {false}
                            editable={true}
                            maxLength={40}
                            autoCorrect={false}
                            autoFocus={true}
                            clearButtonMode="while-editing"
                            // 去掉安卓底边框
                            underlineColorAndroid="transparent"
                            onSubmitEditing={(event: any) => this.doInputSearchHandle(event.nativeEvent.text)}
                        />
                    </View>

                    <TouchableOpacity activeOpacity={.3} onPress={() => this.onPressHandle()}>
                        <View style={styles.cancel}>
                            <Text style={styles.cancelText}>取消</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 主部分 */}
                <ScrollView
                    ref={scrollRef => this.scrollRef = scrollRef}
                    style={styles.scrollView}
                    // 滑动时是否隐藏软键盘
                    keyboardDismissMode="on-drag"
                >
                    
                    {/* 搜索历史 header */}
                    {
                        history && history.length > 0
                        ? (
                            <View style={styles.historyBox}>
                                <Text style={{ color: defaultTheme.selectedFontColor }}>搜索历史</Text>
                                
                                <TouchableOpacity
                                    activeOpacity={.3}
                                    onPress={() => this.onEmptyHistoryHandle()}
                                >
                                    <Icon
                                        size={20}
                                        color="gray"
                                        name="trash"
                                    />    
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }
                    
                    {/* 搜索历史条目 */}
                    {
                        history && history.length > 0
                        ? (
                            <View style={[
                                styles.historyBox, 
                                { flex: 1, flexWrap: 'wrap', justifyContent: 'flex-start', borderBottomWidth: 0 }
                            ]}>
                                {
                                    history.map((item: HistoryItem, i: number) => {
                                        return (
                                            <TouchableOpacity 
                                                activeOpacity={0.3} 
                                                key={i}
                                            >
                                                <View style={styles.historyItem}>
                                                    <Text style={{lineHeight: 36}}>{item.keyword}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </View>
                        ) : null
                    }

                    {/* 热门搜索 */}
                    <View style={[styles.historyBox, { marginTop: 10 }]}>
                        <Text style={{ color: defaultTheme.selectedFontColor }}>热门搜索</Text>
                    </View>
                    
                    {/* 热门条目 */}
                    {
                        hotList.map((item: HistoryItem, index: number) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.3} 
                                    key={index}
                                    onPress={() => this.doSearchHandle(item)}
                                >
                                    <View style={[
                                        styles.historyItem,
                                        styles.hotItem,
                                        { width: screenWidth - 20, borderLeftWidth: 0 }
                                    ]}>
                                        <Text style={{ color: this.getColor(index), marginRight: 6 }}>{index + 1}.</Text>
                                        <Text style={{lineHeight: 36}}>{item.keyword}</Text>

                                        {
                                            index === 0
                                            ? (
                                                <Image style={styles.hotIcon} source={require('./../../../assets/images/i_hot.png')} resizeMode="contain" />
                                            ) : null
                                        }
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }

                    {/* {
                        [0, 1, 2, 3, 4].map((item: number) => {
                            return (
                                <TextView
                                    key={item}
                                    value={value}
                                    onChangeText={(text: string) => this.onChangeValue(text)}
                                    onFocusHandle={this.onFocusHandle}
                                    parentRef={childRef => this[refName] = childRef}
                                />
                            );
                        })
                    } */}
                    
                    <TextView
                        value={value}
                        onChangeText={(text: string) => this.onChangeValue(text)}
                        onFocusHandle={this.onFocusHandle}
                        parentRef={childRef => this.textInput = childRef}
                    />
                </ScrollView>
            </View>
        );
    }

    /**
     * 获得热门搜索排名颜色
     * 
     * @private
     * @memberof Search
     */
    private getColor  = (index: number) => {
        switch (index) {
            case 0:
                return '#CC0000';
            case 1:
                return '#FF6600';
            case 2:
                return '#ffCC66';
            default:
                return '#bfbfbf';
        }
    }
}

const styles = StyleSheet.create({
    inputBox: {
        borderRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cdcdcd',
        paddingLeft: 10,
    },

    input: {
        height: 33,
        borderRadius: 17,
        backgroundColor: defaultTheme.defaultBackgroundColor,
        width: screenWidth * .7,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        textAlignVertical: 'center',
    },

    cancel: {
        height: 33,
    },

    cancelText: {
        height: 33,
        lineHeight: 33,
    },

    scrollView: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50,
    },

    historyBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: defaultTheme.borderColor,
    },

    historyItem: {
        paddingLeft: 6,
        paddingRight: 6,
        height: 36,
        width: (screenWidth - 22) / 2,
        borderTopColor: defaultTheme.borderColor,
        borderLeftColor: defaultTheme.borderColor,
        borderBottomColor: defaultTheme.borderColor,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
    },

    hotItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    hotIcon: {
        width: 15,
        height: 15,
        marginLeft: 5,
    }
});

const mapStateToProps = (state: Store) => ({
    history: getHistory(state),
});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
    dispatch,
    saveSearchHistoryItem: bindActionCreators(saveSearchHistoryItem, dispatch),
    emptySearchHistoryItems: bindActionCreators(emptySearchHistoryItems, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Search);