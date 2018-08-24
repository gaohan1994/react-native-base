import React from 'react';
import { 
    Text,
    View,
    ScrollView,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    TouchableOpacity,
    findNodeHandle,
} from 'react-native';
import TextInput from './MyTextInput';
import { styles as HomeStyles } from '../container/Home';

import { defaultTheme } from '../util/common';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface Props {
    value: string;
    onChangeText: (text: string) => void;
    onFocusHandle?: (ref: any) => void;
    parentRef?: (ref: any) => void;
}
class TextView extends React.Component<Props, {}> {

    private timer: any;

    private textRef: any;

    /**
     * @param refName 点击的 textinput ref
     *
     * @memberof Search
     */
    // public onFocusHandle = () => {
    //     // 如果是 ios 处理一下
    //     if (Platform.OS === 'ios') {

    //         const { scrollRef } = this.props;
    //         console.log('scrollRef: ', scrollRef);
            
    //         if (this.timer) {
    //             console.log('timer ex');
    //             clearTimeout(this.timer);
    //         } 

    //         this.timer = setTimeout(() => {
    //             console.log('scrollRef: ', scrollRef);
    //             console.log('this.textRef: ', this.textRef);
    //             const scrollResponder = scrollRef.getScrollResponder();
    //             scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
    //                 findNodeHandle(this.textRef),
    //                 130,
    //                 true
    //             );
    //         }, 100);
    //     }
    // }

    render() {
        console.log('init');
        return (
            <View
                style={[HomeStyles.headerContaier, { backgroundColor: defaultTheme.defaultBackgroundColor }]}>
                <View style={styles.inputBox}>        
                    <Image 
                        source={require('../../assets/images/i_search_grey.png')} 
                        style={HomeStyles.headerSearchImg}
                        resizeMode="contain"
                    />
                    <TextInput
                        {...this.props}
                        // ref={ref => this.textRef = ref}
                        ref={this.props.parentRef}
                        style={styles.input}
                        // value={value}
                        // onChangeText={(text) => this.onChangeValue(text)}
                        multiline = {false}
                        editable={true}
                        maxLength={40}
                        autoCorrect={false}
                        autoFocus={true}
                        clearButtonMode="while-editing"
                        // 去掉安卓底边框
                        underlineColorAndroid="transparent"
                        // onSubmitEditing={(event: any) => this.doInputSearchHandle(event.nativeEvent.text)}
                        onFocus={this.props.onFocusHandle 
                            ? this.props.onFocusHandle.bind(this, this.textRef) 
                            : () => {/**/}}
                        /* value onChangeText onSubmitEditing */ 
                    />
                </View>
                <TouchableOpacity 
                    activeOpacity={.3} 
                    // onPress={() => this.onPressHandle()}
                >
                    <View style={styles.cancel}>
                        <Text style={styles.cancelText}>取消</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputBox: {
        borderRadius: 17,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cdcdcd',
        paddingLeft: 10,
    },

    input: {
        height: 33,
        borderRadius: 17,
        backgroundColor: defaultTheme.defaultBackgroundColor,
        width: screenWidth * .7,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        textAlignVertical: 'center',
    },

    scrollView: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 50,
    },

    cancel: {
        height: 33,
    },

    cancelText: {
        height: 33,
        lineHeight: 33,
    },
});

export default TextView;