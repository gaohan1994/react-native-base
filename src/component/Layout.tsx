/**
 * created by Ghan 2018.8.3
 */
import React, { Component } from 'react';
import { 
    connect,
    Dispatch,
} from 'react-redux';
import { 
    View,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { mergeProps } from '../util/util';
import { Store } from '../reducer/type';
import { getStatusBarTheme } from '../reducer/status';

interface Props {
    theme?: string;
}

/**
 * theme: one of dark or light
 */
interface State { }

class Bar extends Component<Props, State> {

    render() {
        const { theme } = this.props;

        return (
            <StatusBar
                animated={true}
                translucent={true}
                barStyle={theme === 'light' ? 'light-content' : 'dark-content'}
                backgroundColor={theme === 'light' ? 'rgba(255, 255, 255, 0)' : 'rgb(0, 0, 0)'}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        position: 'relative',
    }
});

const mapStateToProps = (state: Store) => ({
    theme: getStatusBarTheme(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Bar);