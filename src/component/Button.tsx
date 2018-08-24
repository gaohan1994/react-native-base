/**
 * created by Ghan 8.24
 * 
 * Button 组件
 * 
 * Usaga:
 * 
 * import Button from 'xx/Button';
 * 
 * render() {
 *  ...
 *  <Button
 *      text="按钮"
 *      onPress={this.onPressHandle}
 *      size="small"
 *      type="ghost"
 *      color="#000000"
 *      radius={true}
 *  />
 * }
 */

import React from 'react';
import { 
    TouchableOpacity,
    Text, 
    View,
    StyleSheet,
    Dimensions,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { common, defaultTheme } from '../util/common';

/**
 * 获取屏幕宽度来设置 Button 大小
 */
const { width: screenWidth } = Dimensions.get('window');

/**
 * @todo 根据传入的参数来设置 Button 
 * 
 * @param onPress 点击回调事件
 * 
 * @param text button 内容 必填项
 *
 * @param size default big
 *  - big 大 全屏幕宽 default
 *  - normal 中 半个屏幕宽
 *  - small 小 不设置宽度 padding 10
 * 
 * @param type default normal
 *  - ghost 空心无背景色
 *  - normal 实心有背景色
 * 
 * @param color 主题颜色
 * 
 * @param radius 是否圆角
 * 
 * @interface Props
 */
interface Props {
    text    : string;
    onPress ?: () => void;
    size    ?: 'big' | 'normal' | 'small';
    type    ?: 'ghost' | 'normal';
    color   ?: string;
    radius  ?: boolean;
}

class Button extends React.Component<Props, {}> {
    render() {
        const { onPress, text } = this.props;
        return (
            <TouchableOpacity 
                activeOpacity={.3}
                onPress={onPress ? onPress : () => {/* */} }
            >
                <View 
                    style={[
                        styles.commonButton,
                        this.setButtonSizeStyle(),
                        this.setButtonTypeStyle(),
                        this.setButtonRadius(),   
                    ]}
                >
                    <Text 
                        style={[
                            styles.commonText,
                            this.setTextColor(),
                        ]}
                    >
                        {text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * @todo 根据 size 渲染 Button 大小
     *
     * @private
     * @memberof Button
     */
    private setButtonSizeStyle = (): ViewStyle | ViewStyle[] => {
        const { size = 'big' } = this.props;

        switch (size) {
            case 'big':
                return styles.bigButton;
            case 'normal':
                return styles.normalButton;
            case 'small':
                return styles.smallButton;
            default:
                return styles.bigButton;
        }
    }

    /**
     * @todo 根据 type 渲染 Button 类型
     *
     * @private
     * @memberof Button
     */
    private setButtonTypeStyle = (): ViewStyle | ViewStyle[] => {
        const { type = 'normal', color = defaultTheme.themeRed } = this.props;

        switch (type) {
            case 'ghost':

                return [
                    common.dashBtn,
                    {
                        borderTopColor: color,
                        borderRightColor: color,
                        borderBottomColor: color,
                        borderLeftColor: color,
                    }
                ];
            case 'normal':
                return { backgroundColor: color, };

            default:
                return { backgroundColor: color, };
        }
    }

    /**
     * @todo 根据 radius 渲染 Button 是否圆角
     *
     * @private
     * @memberof Button
     */
    private setButtonRadius = (): ViewStyle | ViewStyle[] => {
        const { radius = true } = this.props;

        if (radius === true) {
            return styles.radius;
        } else {
            return styles.antiRadius;
        }
    }

    /**
     * @todo 根据 color 渲染 Text 颜色
     *
     * @private
     * @memberof Button
     */
    private setTextColor = (): TextStyle | TextStyle[] => {
        const { type = 'normal', color = defaultTheme.themeRed } = this.props;

        switch (type) {
            case 'ghost':
                return {  color: color };

            case 'normal':
                return {  color: '#ffffff' };

            default:
                return {  color: '#ffffff' };
        }
    }
}

const styles = StyleSheet.create({
    text: {
        color: defaultTheme.themeRed,
    },

    commonButton: {
        height: 36
    },

    commonText: {
        lineHeight: 36,
    },

    bigButton: {
        width: screenWidth * .8
    },

    normalButton: {
        width: screenWidth * .4,
    },

    smallButton: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    radius: {
        borderRadius: 18,
    },

    antiRadius: {
        borderRadius: 0,
    }
});

export default Button;