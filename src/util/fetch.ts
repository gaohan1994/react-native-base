import { merge } from 'lodash';

export interface AjaxType {
    url     ?: string;
    method  ?: string;
    data    ?: any;
    dataType?: string;
    headers ?: any;
    success ?: (data?: any) => void;
    error   ?: (data?: any) => void;
    complete?: (data?: any) => void;
}

export interface Header {
    'Content-Type': string;
    'credentials': string;
    'mode': string;
}

function toForm (data: any) {
    let formData = new FormData();
    let keyArr = Object.keys(data);
    if (keyArr.length < 1) { 
        return {};
    }
    keyArr.map((item) => {
        formData.append(item, data[item]);
    });
    return formData;
}

function toJsonStr(data: any) {
    return JSON.stringify(data);
}

function formatData(headers: Header, data: any) {
    if (!headers || !headers['Content-Type'] || headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return toForm(data);
    }
    switch (headers['Content-Type']) {
        case 'application/json':
            return toJsonStr(data);
        default :
            return toForm(data);
    }
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
    // method = 'GET', 
    // data: any,
    ...args: Array<any>
) => {

    const argByType: any = {};
    args.forEach(arg => {
        argByType[typeof arg] = arg;
    });

    const httpMethod = (argByType.string || 'get').toUpperCase();
    const params = argByType.object || {};
    const callback = argByType.function || emptyFunction;

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

    fetch(url, options)
    .then((response: any) => response.json())
    .then((responseJson: any) => {

        console.log('---------------------- 响应报文 ----------------------');
        console.log(responseJson);
        console.log('---------------------- 报文结束 ----------------------');
        if (callback) {
            callback(responseJson);
        }
    }).catch((err: any) => {
        throw new Error(err.message || '');
    });
};

const emptyFunction = () => {/* no empty */};


export default request;