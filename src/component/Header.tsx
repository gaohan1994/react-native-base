import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { isLT19 } from '../util/util';
import { styles as HomeStyles } from '../container/Home';
import Button from './Button';
import Icon from 'react-native-vector-icons/EvilIcons';

/**
 * @param navigation 导航器
 *
 * @interface Props
 */
interface Props {
    navigation?: NavigationScreenProp<any, any>;
}
class Header extends React.Component<Props, {}> {

    /**
     * 点击返回按钮
     *
     * @memberof Header
     */
    public onPressHandle = (): void => {
        const { navigation } = this.props;

        if (navigation) {
            navigation.goBack();
        }
    }

    render (): React.ReactNode {
        return (
            <View style={[styles.contaienr]}>
                <TouchableOpacity
                    activeOpacity={.3}
                    onPress={() => this.onPressHandle()}
                >
                    <Icon
                        size={33}
                        name="chevron-left"
                        color="gray"
                    />
                </TouchableOpacity>
                <Button size="small" type="ghost" text="2858跟帖" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contaienr: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 68,
        paddingTop: isLT19() ? 0 : 25,
        paddingBottom: 5
    },
});

export default Header;