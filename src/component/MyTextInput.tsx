/**
 * created by Ghan 2018.8.10
 */
import React from 'react';
import {
    TextInput,
    Platform,
} from 'react-native';

/**
 * 无法输入中文的解决方案
 * 
 * @class MyTextInput
 * @extends {TextInput}
 */
class MyTextInput extends TextInput {

    shouldComponentUpdate (nextProps: any) {
        return Platform.OS !== 'ios'
            || (this.props.value === nextProps.value && (nextProps.defaultValue === undefined || nextProps.defaultValue === '' ))
            || (this.props.defaultValue === nextProps.defaultValue && (nextProps.value === undefined || nextProps.value === '' ));
    }

    render() {
        return (
            <TextInput
                {...this.props}
            />
        );
    }
}

export default MyTextInput;