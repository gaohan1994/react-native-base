/**
 * created by Ghan 2017.7.31 修正
 */

import MainTab from './TabNavigator';

/**
 * 路由配置
 * 
 * 所有一级页面都在该文件下注册且配置 NavigationOption 
 * 
 * api: https://reactnavigation.org/docs/en/stack-navigator.html
 * 
 * title
 * header
 * headerTitle
 * headerTitleAllowFontScaling
 * headerBackImage
 * headerBackTitle
 * headerTruncatedBackTitle
 * headerRight
 * headerLeft
 * headerStyle
 * headerForceInset
 * headerTitleStyle
 * headerBackTitleStyle
 * headerLeftContainerStyle
 * headerRightContainerStyle
 * headerTitleContainerStyle
 * headerTintColor
 * headerPressColorAndroid
 * headerTransparent
 * headerBackground
 * gesturesEnabled
 * gestureResponseDistance
 * gestureDirection
 * 
 */

const RouteConfig = {
    MainTab: {
        screen: MainTab,
        navigationOptions: () => ({
            header: null
        }),
    }
};

export default RouteConfig;