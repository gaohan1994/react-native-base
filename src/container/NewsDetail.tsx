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
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import HTMLView, { HTMLViewNode } from 'react-native-htmlview';

// react redux
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Store } from '../reducer/index';
import { mergeProps } from '../util/util';
import { common, defaultTheme, getImageHeight } from '../util/common';

import { fetchNewsDetail } from '../action/home';
import { getHTMLViews } from '../reducer/home';

interface Props { 
    navigation: NavigationScreenProp<any, any>;
    fetchNewsDetail: (item: any) => void;
    HTMLViews: any;
}

interface State { }

class NewsDetail extends React.Component <Props, State> {

    componentDidMount() {
        const { navigation: { state: { params }}, fetchNewsDetail } = this.props;
        
        const { item } = params;

        fetchNewsDetail(item);
    }

    render (): React.ReactNode {
        const { navigation: { state: { params }}, HTMLViews } = this.props;
        
        const { item } = params;

        console.log('HTMLViews: ', HTMLViews);
        
        return (
            <View style={styles.container}>
                {/* 状态栏 */}
                <StatusBar 
                    barStyle="dark-content"
                    // backgroundColor={'rgba(0, 255, 255, 0)'} 
                    translucent={true} 
                    animated={true}
                />

                <ScrollView
                    style={styles.htmlBody}
                >
                    {
                        HTMLViews && HTMLViews[item.docid]
                        ? (
                            <HTMLView
                                value={HTMLViews[item.docid].body}
                                stylesheet={htmlStyles}
                                renderNode={this.renderNode}
                            />
                        ) : null
                    }
                </ScrollView>
            </View>
        );
    }

    private renderNode = (node: HTMLViewNode, index: number): ReactNode => {
        console.log('node: ', node);
        console.log('index: ', index);

        if (node.name === 'img') {

            const { attribs } = node;

            return (
                <TouchableOpacity
                    activeOpacity={.3}
                    key={index}
                >
                    <Image source={{ uri: attribs.src }} resizeMode="stretch" style={{ flex: 1, height: getImageHeight(attribs.src) }} />
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
    }
});

const mapStateToProps = (state: Store) => ({
    HTMLViews: getHTMLViews(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchNewsDetail: bindActionCreators(fetchNewsDetail, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewsDetail);