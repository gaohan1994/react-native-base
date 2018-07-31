import { 
    Platform
} from 'react-native';

/**
 * 判断 android API 是否小于 19(4.4以下)，如果是则不能使用沉浸状态栏
 */
export function isLT19() {
    return Platform.OS === 'android' && Platform.Version < 19;
}