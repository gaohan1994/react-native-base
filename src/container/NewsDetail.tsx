/**
 * created by Ghan 8.20
 * 
 * 新闻详情页面
 */

import React, { ReactNode } from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';
import ImageViewer from 'react-native-image-zoom-viewer';
import Header from '../component/Header';

// react redux
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/index';
import { mergeProps } from '../util/util';
import { common, defaultTheme, getImageHeight } from '../util/common';

import { fetchNewsDetail } from '../action/home';
import { getHTMLViews, getImageUrls } from '../reducer/home';

interface Props { 
    navigation: NavigationScreenProp<any, any>;
    fetchNewsDetail: (item: any) => void;
    HTMLViews: any;
    imageUrls: any[];
}

interface State { 
    showImageViewer: boolean;
    initIndex: number;
}

class NewsDetail extends React.Component <Props, State> {
    state = {
        showImageViewer: false,
        initIndex: 0,
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

    public onChangeImageHandle = (index?: number): void => {
        console.log('index: ', index);
    }

    render (): React.ReactNode {
        const { showImageViewer, initIndex } = this.state;
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

                <Header/>

                <ScrollView
                    style={styles.htmlBody}
                >
                    {
                        HTMLViews
                        ? (
                            <HTMLView
                                value={HTMLViews.body}
                                stylesheet={htmlStyles}
                                renderNode={this.renderNode}
                            />
                        ) : null
                    }
                </ScrollView>

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
                        onChange={this.onChangeImageHandle}
                    />
                </Modal>
            </View>
        );
    }

    private renderNode = (node: HTMLViewNode, index: number): ReactNode => {

        if (node.name === 'img') {

            const { attribs } = node;

            return (
                <TouchableOpacity
                    activeOpacity={.3}
                    key={index}
                    onPress={() => this.onOpenImageViewer(index + 1)}
                >
                    <Image 
                        source={{ uri: attribs.src }} 
                        resizeMode="stretch" 
                        style={{ flex: 1, height: getImageHeight(attribs.src) }} 
                    />
                </TouchableOpacity>
            );
        }        
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
    console.log('find images: ', getImageUrls(state, id));
    return {
        HTMLViews: getHTMLViews(state, id),
        imageUrls: getImageUrls(state, id),
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchNewsDetail: bindActionCreators(fetchNewsDetail, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsDetail);