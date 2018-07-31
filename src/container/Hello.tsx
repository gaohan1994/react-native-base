/**
 * created by Ghan 2018.7.31
 * 首页
 */

import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    StatusBar,
    // Platform
} from 'react-native';
import HelloClass from '../class/hello';

interface Props {}

interface State {
    value: number;
}

class Hello extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    public testClassHandle = () => {
        HelloClass.baseMethod();
    }

    public onDecrementHandle = (): void => {
        this.setState({
            value: this.state.value - 1
        });
    }

    public onIncrementHandle = (): void => {
        this.setState({
            value: this.state.value + 1
        });
    }

    render (): React.ReactNode {

        const { value } = this.state;
        console.log('__DEV__', __DEV__);
        return (
            <View style={styles.container}>
                <Text>Hello, Gaohan, {value} times</Text>
                <Text>
                    {__DEV__ === true
                    ? 'dev'
                    : 'pro'}
                </Text>
                <View>
                    <Button
                        title="-"
                        onPress={this.onDecrementHandle}
                        color="red"
                        accessibilityLabel="decrement"
                    />
                </View>

                <View>
                    <Button
                        title="+"
                        onPress={this.onIncrementHandle}
                        color="blue"
                        accessibilityLabel="increment"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative'
    },
});

export default Hello;