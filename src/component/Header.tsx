import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { isLT19 } from '../util/util';
import { styles as HomeStyles } from '../container/Home';
import Button from './Button';
import Icon from 'react-native-vector-icons/EvilIcons';

class Header extends React.Component {

    render (): React.ReactNode {
        return (
            <View style={[styles.contaienr]}>
                <Icon
                    size={33}
                    name="chevron-left"
                    color="gray"
                />
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