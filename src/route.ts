/**
 * created by Ghan 2017.7.31 修正
 */
import MainTab from './TabNavigator';
import NewsSearch from './container/search/newsSearch';

/**
 * 路由配置
 * 
 * 所有一级页面都在该文件下注册且配置 NavigationOption 
 * 
 * api: https://reactnavigation.org/docs/en/stack-navigator.html
 * 
 * @param title
 * @param header
 * @param headerTitle
 * @param headerTitleAllowFontScaling
 * @param headerBackImage
 * @param headerBackTitle
 * @param headerTruncatedBackTitle
 * @param headerRight
 * @param headerLeft
 * @param headerStyle
 * @param headerForceInset
 * @param headerTitleStyle
 * @param headerBackTitleStyle
 * @param headerLeftContainerStyle
 * @param headerRightContainerStyle
 * @param headerTitleContainerStyle
 * @param headerTintColor
 * @param headerPressColorAndroid
 * @param headerTransparent
 * @param headerBackground
 * @param gesturesEnabled 是否可以用手势删除该屏幕
 * @param gestureResponseDistance
 * @param gestureDirection
 * 
 */

const RouteConfig = {
    MainTab: {
        screen: MainTab,
        navigationOptions: () => ({
            header: null
        }),
    },

    NewsSearch: {
        screen: NewsSearch,
        navigationOptions: () => ({
            header: null,
            gesturesEnabled: true
        }),
    },
};

export default RouteConfig;