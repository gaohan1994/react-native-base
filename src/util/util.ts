import { merge } from 'lodash';
import { 
    Platform
} from 'react-native';

/**
 * 判断 android API 是否小于 19(4.4以下)，如果是则不能使用沉浸状态栏
 */
export function isLT19() {
    return Platform.OS === 'android' && Platform.Version < 19;
}

/**
 * connect 需要用到的merge工具
 * @param stateProps 
 * @param dispatchProps 
 * @param ownProps 
 */
export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object, ...rest: Array<any>) => {
    return merge({}, ownProps, stateProps, dispatchProps, rest);
};