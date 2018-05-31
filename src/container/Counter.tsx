import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {}
interface State {}

class Counter extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {};
    }

    render (): React.ReactNode {

        return (
            <View>
                <Text>Hello, Gaohan, 1 times</Text>

                <View>
                    <Button
                        title="-"
                        onPress={() => {/**/}}
                        color="red"
                        accessibilityLabel="decrement"
                    />
                </View>

                <View>
                    <Button
                        title="+"
                        onPress={() => {/**/}}
                        color="blue"
                        accessibilityLabel="increment"
                    />
                </View>
            </View>
        );
    }
}

export default Counter;