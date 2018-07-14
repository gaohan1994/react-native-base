import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import HelloClass from '../class/hello';

interface Props {}

interface State {}

class List extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {};
    }

    render (): React.ReactNode {

        return (
            <View style={styles.container}>
                <Text>Hello, Gaohan times</Text>
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

export default List;