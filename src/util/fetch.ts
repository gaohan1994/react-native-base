import { merge } from 'lodash';
import CentermRequestError from '../class/exception';
import DialogUtil from '../class/dialogUtil';

/**
 * 回调函数类型
 * 
 * 接受类型 T 和数据类型是T的数据 arg 返回 void
 * @interface GenericCallbackFn
 */
interface GenericCallbackFn {
    <T>(arg: T): void;
}

/**
 *  回调函数类型
 *
 * @interface GenericCallbackT
 * @template T
 */
interface GenericCallbackT<T> {
    (arg: T): void;
}

interface RequsetError {
    message?: string;
}

/**
 * 发起一个api请求
 * 
 * CT.api('/me') // throw away the response
 * CT.api('/me', function(r) { console.log(r) })
 * CT.api('/me', 'post', function(r) { console.log(r) })
 * CT.api('/me', { fields: 'email' }) // throw away the response
 * CT.api(
 *  '/me',
 *  'post',
 *  { body: 'hi there' },
 *  function(r) {
 *     console.log(r)
 *  }
 * )
 * 
 * @class CentermSDK
 */
const request = (
    url: string,
    ...args: Array<any>
) => {

    const argByType: any = {};

    const functions: Array<GenericCallbackFn> = [];

    let callback: GenericCallbackFn;
    
    let errorCallback: GenericCallbackT<RequsetError> = defaultErrorCallback;

    args.forEach(arg => {

        if (typeof arg === 'function') {
            /**
             * 如果是 function push 到 functions 中
             */

            functions.push(arg);
        } else {

            argByType[typeof arg] = arg;
        }
    });

    /**
     *  判断长度 第一个是 callback 第二个是 errorcallback
     */

    if (functions && functions.length > 0) {
        if (functions.length === 1) {
            callback = functions[0];
        } else if (functions.length === 2) {
            callback = functions[0];
            errorCallback = functions[1];
        }
    }

    const httpMethod = (argByType.string || 'get').toUpperCase();
    
    const params = argByType.object || {};

    let options: RequestInit = {

        /* 默认method */
        method: httpMethod,

        /* 默认headers */
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', /* 默认格式 */
            'credentials': 'include', /* 包含cookie */
        }
    };

    /* 处理body */
    if (options.method) {
        if (options.method.toUpperCase() === 'POST') {
            options.body = params
            ? JSON.stringify(params) 
            : '';
        }
    }

    console.log('---------------------- 请求报文 ----------------------');
    console.log(url);
    if (options.method === 'POST') {
        console.log(options);
    }
    console.log('---------------------- 报文结束 ----------------------');

    fetch(url, options)
    .then((response: any) => response.json())
    .then((responseJson: any) => {

        console.log('---------------------- 响应报文 ----------------------');
        console.log(responseJson);
        console.log('---------------------- 报文结束 ----------------------');
        try {
            if (callback) {
                callback(responseJson);
            }
        } catch (error) {
            console.log('---------------------- 错误信息 ----------------------');
            console.log(error);
            console.log('---------------------- 信息结束 ----------------------');

            errorCallback(error);
        }
    }).catch((err: any) => {
        errorCallback(err);
    });
};

/**
 * 默认错误处理函数
 * @param error RequsetError
 */
const defaultErrorCallback: GenericCallbackT<RequsetError> = (error) => {

    console.log('---------------------- 错误信息 ----------------------');
    console.log(error.message || '请求错误');
    console.log('---------------------- 信息结束 ----------------------');

    DialogUtil.showToast(error.message || '请求错误');

    throw new Error(error.message || '请求错误');
};

export default request;