/**
 * created by Ghan 8.20
 * 
 * 新闻详情页面
 */

import React, { ReactNode } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    Platform,
    findNodeHandle,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../component/Header';
// import TextView from '../component/TextView';
import MyTextInput from '../component/MyTextInput';

// react redux
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/index';
import { mergeProps } from '../util/util';
import { common, defaultTheme, getBorderColor } from '../util/common';

import { fetchNewsDetail } from '../action/home';
import { getHTMLViews, getImageUrls, } from '../reducer/home';

const { width: screenWidth } = Dimensions.get('window');

/**
 * @param navigation 导航器
 * @param fetchNewsDetail 请求news data
 * @param HTMLViews 从redux取到本id的htmlview
 * @param imageUrls 本id的images
 *
 * @interface Props
 */
interface Props { 
    navigation: NavigationScreenProp<any, any>;
    fetchNewsDetail: (item: any) => void;
    HTMLViews: any;
    imageUrls: any[];
}

/**
 * @param showImageViewer 是否显示 image Viewer
 * @param initIndex image viewer 初始位置
 * @param showTextInput 是否显示评论的输入框
 *
 * @interface State
 */
interface State { 
    showImageViewer: boolean;
    initIndex: number;
    showTextInput: boolean;
}

class NewsDetail extends React.Component <Props, State> {
    // 定时器
    private timer: any;
    // 评论输入框 ref
    private commentInput: any;
    // scroll ref
    private scrollRef: any;

    /**
     * default State extends Interface State
     * @param state 
     * @memberof NewsDetail
     */
    state = {
        showImageViewer: false,
        initIndex: 0,
        showTextInput: false,
    };

    componentDidMount() {
        const { navigation: { state: { params }}, fetchNewsDetail } = this.props;
        
        const { item } = params;

        fetchNewsDetail(item);
    }

    /**
     * 打开 ImageViewer
     *
     * @memberof NewsDetail
     */
    public onOpenImageViewer = (index?: number): void => {
        if (typeof index === 'number') {
            this.setState({ 
                showImageViewer: true,
                initIndex: index,
            });
        } else {
            this.setState({ showImageViewer: true });
        }
    }

    /**
     * 关闭 ImageViewer
     *
     * @memberof NewsDetail
     */
    public onCloseImageViewer = (): void => {
        this.setState({ showImageViewer: false });
    }

    /**
     * 点击底部输入框
     *
     * @memberof NewsDetail
     */
    public inputBoxPressHandle = (): void => {
        this.showInputText();
    }

    /**
     * 显示评论输入框
     *
     * @memberof NewsDetail
     */
    public showInputText = (): void => {
        this.setState({ showTextInput: true });
    }

    /**
     * 隐藏评论输入框
     *
     * @memberof NewsDetail
     */
    public hideInputText = (): void => {
        this.setState({ showTextInput: false });
    }

    /**
     * @param refName 点击的 textinput ref
     *
     * @memberof Search
     */
    public onFocusHandle = () => {
        // 如果是 ios 处理一下
        if (Platform.OS === 'ios') {
            if (this.timer) {
                console.log('timer ex');
                clearTimeout(this.timer);
            } 

            this.timer = setTimeout(() => {
                // console.log('this[refName]: ', this.commentInput);
                const scrollResponder = this.scrollRef.getScrollResponder();
                scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                    findNodeHandle(this.commentInput),
                    130,
                    true
                );
            }, 100);
        }
    }

    /**
     * 挂载 on scroll
     *
     * @memberof NewsDetail
     */
    public onScrollHandle = (event?: NativeSyntheticEvent<NativeScrollEvent>) => {
        console.log('on scroll');
        if (event) {
            console.log('nativeEvent : ', event.nativeEvent);
        }
    }

    render (): React.ReactNode {
        const { showImageViewer, initIndex, showTextInput } = this.state;
        const { navigation: { state: { params }}, HTMLViews, imageUrls } = this.props;
        const { item } = params;
        return (
            <View style={styles.container}>
                {/* 状态栏 */}
                <StatusBar 
                    barStyle="dark-content"
                    // backgroundColor={'rgba(0, 255, 255, 0)'} 
                    translucent={true} 
                    animated={true}
                />

                {/* 头部 */}
                <Header navigation={this.props.navigation} />

                <ScrollView
                    style={styles.htmlBody}
                    ref={scrollRef => this.scrollRef = scrollRef}
                    onScroll={this.onScrollHandle}
                    scrollEventThrottle={100}
                >

                    {
                        HTMLViews ? (
                            <HTMLView
                                value={HTMLViews.body}
                                stylesheet={htmlStyles}
                                renderNode={this.renderNode}
                            />
                        ) : null
                    }
                </ScrollView>

                {/* 底部 */}
                <View style={[common.footer, styles.footer]}>
                    <TouchableOpacity
                        activeOpacity={.2}
                        onPress={() => this.inputBoxPressHandle()}
                    >
                        <View 
                            style={[
                                common.dashBtn, 
                                styles.inputText, 
                                getBorderColor('#f1f1f1')
                            ]}
                        >
                            <MyTextInput
                                ref={commentInput => this.commentInput = commentInput}
                                key={item}
                                value={'123'}
                                style={[common.input, styles.input]}
                                // onChangeText={(text: string) => this.onChangeValue(text)}
                                // onFocus={this.onFocusHandle}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Image Viewer 大图查看器 */}
                <Modal
                    visible={showImageViewer}
                    transparent={true}

                    /* onRequestClose 安卓物理返回关闭 */
                    onRequestClose={() => this.onCloseImageViewer()}
                >
                    <ImageViewer
                        index={initIndex}
                        imageUrls={imageUrls || []}
                        onClick={() => this.onCloseImageViewer()}
                    />
                </Modal>
            </View>
        );
    }

    private renderNode = (node: HTMLViewNode, index: number): ReactNode => {
        if (node.name === 'img') {
            const { attribs } = node;
            // const height = getImageHeight(attribs.src);
            return (
                <TouchableOpacity
                    activeOpacity={.3}
                    key={index}
                    onPress={() => this.onOpenImageViewer()}
                >
                    <Image 
                        source={{ uri: attribs.src }} 
                        resizeMode="stretch" 
                        style={{ flex: 1, height: this.getImageHeight(attribs.src) }} 
                    />
                </TouchableOpacity>
            );
        }        
    }

    private  getImageHeight = (imageUrl: string): number => {
        /**
         * default height
         */
        let imgHeight: number = 230;
    
        Image.getSize(
            imageUrl, 
            (width, height) => {
                // console.log('screenWidth: ', screenWidth);
                // console.log('width: ', width);
                // console.log('height: ', height);
                // imgHeight = Math.floor(screenWidth / width * height);
                imgHeight = Math.floor(screenWidth * height / width);
                console.log('getsize imgHeight : ', imgHeight);
                // return imgHeight;
            },
            (error) => {
                console.log('error getimagesize ', error);
            }
        );
        console.log('imgHeight: ', imgHeight);
    
        return imgHeight;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative'
    },

    htmlBody: {
        padding: 10,
    },

    footer: {
        height: 50,
        width: screenWidth,
        // backgroundColor: defaultTheme.defaultBackgroundColor,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    inputText: {
        borderRadius: defaultTheme.inputHeight * .5,
    },

    input: {
        width: screenWidth * .4,
    }
});

const htmlStyles = StyleSheet.create({
    p: {
        color: '#2c2c2c',
        lineHeight: 30,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        paddingTop: 10,
        paddingBottom: 10,
    }
});

/**
 * redux 中拿出需要的数据
 * 
 * @param HTMLViews 需要展示的 htmlview 数据
 * @param imageUrls 该条数据内的 images
 */
const mapStateToProps = (state: Store, ownProps: Props) => {
    const { navigation: { state: { params } } } = ownProps;
    const { item: { id } } = params;

    return {
        HTMLViews: getHTMLViews(state, id),
        imageUrls: getImageUrls(state, id),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchNewsDetail: bindActionCreators(fetchNewsDetail, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsDetail);