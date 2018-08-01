import {
    RECEIVE_HOMENEWS_DATA
} from '../constants/home';
import { Dispatch } from 'redux';
import request from '../util/fetch';

export interface FetchNewsData {
    type: RECEIVE_HOMENEWS_DATA;
    payload?: {
        requestCode: string;
        data?: Array<any>;
    };
}

export type HomeActions = FetchNewsData;

export const fetchNewsData = (requestCode: string, page: number) => (dispatch: Dispatch) => {
    console.log('requestCode: ', requestCode);
    console.log('page: ', page);
    try {

        request(
            `https://c.m.163.com/nc/article/headline/${requestCode}/${page}-10.html%20?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=10&version=5.5.3%20&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore`,
            (data: any) => {
                console.log('data: ', data);
                dispatch({ 
                    type: RECEIVE_HOMENEWS_DATA, 
                    payload: {
                        requestCode,
                        data,
                    }
                });
            }
        );
    } catch (err) {
        throw new Error(err.message || '');
    }
    // dispatch({type: RECEIVE_HOMENEWS_DATA});
};