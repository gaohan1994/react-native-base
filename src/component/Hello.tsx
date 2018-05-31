import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
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

        return (
            <View>
                <Text>Hello, Gaohan, {value} times</Text>

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

export default Hello;