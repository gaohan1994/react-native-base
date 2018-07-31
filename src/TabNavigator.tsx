/**
 * Created by Ghan on 2018-5-31
 */

import React from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';

import Home from './container/Home';
import Video from './container/Video';
import Live from './container/Live';
import Mine from './container/Mine';

interface Props {
    navigation: NavigationScreenProp<{}>;
}
interface State {
    selectedTab: string;
}

class MianTab extends React.Component <Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            selectedTab: '首页'
        };

        this._renderTabarItems = this._renderTabarItems.bind(this);
    }

    render () {
        return (
            <TabNavigator>
                { this._renderTabarItems('首页', require('./../assets/images/i_home.png'), require('./../assets/images/i_home_foc.png'), Home) }
                { this._renderTabarItems('视频', require('./../assets/images/i_video.png'), require('./../assets/images/i_video_foc.png'), Video) }
                { this._renderTabarItems('直播', require('./../assets/images/i_live.png'), require('./../assets/images/i_live_foc.png'), Live) }
                { this._renderTabarItems('我的', require('./../assets/images/i_mine.png'), require('./../assets/images/i_mine_foc.png'), Mine) }
            </TabNavigator>
        );
    }

    private _renderTabarItems = (selectedTab: string, icon: any, selectedIcon: any, ChildComponent: any): JSX.Element => {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Image style={styles.icon} source={icon} />}
                renderSelectedIcon={() => <Image style={styles.icon} source={selectedIcon} />}
                onPress={() => this.setState({ selectedTab: selectedTab })}
            >
                <ChildComponent navigation={ this.props.navigation } />
            </TabNavigator.Item>
        );
    }
}

const styles = StyleSheet.create({
    tabText: {
        color: '#515151',
        fontSize: 12
    },
    selectedTabText: {
        color: '#d81e06'
    },
    icon: {
        width: 25,
        height: 25,
        marginBottom: -3
    }
});

export default MianTab;