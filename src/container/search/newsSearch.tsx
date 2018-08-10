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
} from 'react-native';

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

import { styles as HomeStyles } from '../Home';
import { common, defaultTheme } from '../../util/common';
import TextInput from '../../component/MyTextInput';

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

    constructor (props: Props) {
        super(props);
        this.state = {
            value: ''
        };
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

        this.props.dispatch(emptySearchHistoryItems());
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

    render (): React.ReactNode {

        const { value } = this.state;

        console.log(this.props);

        return (
            <View style={common.container}>
                <StatusBar 
                    barStyle="dark-content"
                    translucent={true} 
                    animated={true}
                />

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
                        />
                    </View>

                    <TouchableOpacity activeOpacity={.3} onPress={() => this.onPressHandle()}>
                        <View style={styles.cancel}>
                            <Text style={styles.cancelText}>取消</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>

                <ScrollView 
                    style={styles.scrollView}
                    // 滑动时是否隐藏软键盘
                    keyboardDismissMode="on-drag"
                >
                    <Text>textt</Text>
                </ScrollView>
            </View>
        );
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
        paddingLeft: 10,
        paddingRight: 10,
    }
});

const mapStateToProps = (state: Store) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<SearchActions>) => ({
    // saveSearchHistoryItem: bindActionCreators(saveSearchHistoryItem, dispatch),
    // emptySearchHistoryItems: bindActionCreators(emptySearchHistoryItems, dispatch),
    dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Search);