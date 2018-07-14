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

const request = ({
    url, 
    method = 'GET', 
    data, 
    dataType, 
    headers, 
    success, 
    error, 
    complete
}: AjaxType) => {

    let options: RequestInit = {

        /* 默认method */
        method: method || 'GET',

        /* 默认headers */
        headers: merge({
            'Content-Type': 'application/x-www-form-urlencoded', /* 默认格式 */
            'credentials': 'include', /* 包含cookie */
            // 'mode': 'cors', /* 允许跨域 */
        }, headers)
    };

    /* 处理body */
    if (options.method) {
        if (options.method.toUpperCase() === 'POST') {
            options.body = data
            ? JSON.stringify(formatData(headers, data)) 
            : '';
        }
    }

    fetch(url, options)
    .then((response: any) => !dataType || dataType === 'json' ? response.json() : response.text())
    .then((responseJson: any) => {
        // success && success(responseJson);
        // complete && complete(responseJson);
        if (success) {
            success(responseJson);
        }

        if (complete) {
            complete(responseJson);
        }
    }).catch((err: any) => {
        
        if (error) {
            error(err);
        }
        
        if (complete) {
            complete();
        }
    });
};

export default request;