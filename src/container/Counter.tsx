import React from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Store } from '../reducer/type';
import { 
    IndexActions,
    increment,
    decrement
} from '../action/hello';
import { getValue } from '../reducer/hello';
import { NavigationScreenProp } from 'react-navigation';
import { merge } from 'lodash';

interface Props {
    navigation  : NavigationScreenProp<{}>;
    getValue    : number;
    increment   : () => void;
    decrement   : () => void;
}
interface State {}

class Counter extends React.Component <Props, State> {

    constructor (props: Props) {
        super(props);
        this.state = {};
    }

    render (): React.ReactNode {
        const { 
            getValue,
            increment,
            decrement,
        } = this.props;
        return (
            <View>
                <Text>Hello, Gaohan, {getValue} times</Text>

                <View>
                    <Button
                        title="-"
                        onPress={decrement}
                        color="red"
                        accessibilityLabel="decrement"
                    />
                </View>

                <View>
                    <Button
                        title="+"
                        onPress={increment}
                        color="blue"
                        accessibilityLabel="increment"
                    />
                </View>
            </View>
        );
    }
}

export const mapStateToProps = (state: Store) => ({
    getValue: getValue(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<IndexActions>) => ({
    increment: bindActionCreators(increment, dispatch),
    decrement: bindActionCreators(decrement, dispatch)
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    merge({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Counter);