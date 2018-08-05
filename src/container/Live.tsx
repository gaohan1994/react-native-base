import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props { }

interface State { }

class List extends React.Component <Props, State> {

    render (): React.ReactNode {
        return (
            <View style={styles.container}>
                <Text>Hello, List Gaohan</Text>
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