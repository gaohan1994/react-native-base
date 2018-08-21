
import { Dispatch } from 'redux';
import {
    RECEIVE_HOMENEWS_DATA,
    CHANGE_NEWSDATA_LOADING,
    RECEIVE_NEWS_DETAIL,
} from '../constants/home';
import request from '../util/fetch';
import Dialog from '../class/dialogUtil';
import { Store } from '../reducer/index';

export interface FetchNewsData {
    type: RECEIVE_HOMENEWS_DATA;
    payload?: {
        requestCode: string;
        data?: any;
    };
}
export interface ChangeNewsDataLoading {
    type: CHANGE_NEWSDATA_LOADING;
    loading: boolean;
}

export interface FetchNewsDetail {
    type: RECEIVE_NEWS_DETAIL;
    newsDetail?: {
        data?: any;
        item?: any;
    };
}

export type HomeActions = FetchNewsData | ChangeNewsDataLoading | FetchNewsDetail;

/**
 * 请求数据接口
 * 
 * @param {Dispatch} dispatch
 */
export const fetchNewsData = (requestCode: string, page: number) => (dispatch: Dispatch) => {


    dispatch({ type: CHANGE_NEWSDATA_LOADING, loading: true });

    request(
        `https://c.m.163.com/nc/article/headline/${requestCode}/${page}-10.html%20?from=toutiao&passport=&devId=OPdeGFsVSojY0ILFe6009pLR%2FMsg7TLJv5TjaQQ6Hpjxd%2BaWU4dx4OOCg2vE3noj&size=10&version=5.5.3%20&spever=false&net=wifi&lat=&lon=&ts=1456985878&sign=oDwq9mBweKUtUuiS%2FPvB015PyTDKHSxuyuVq2076XQB48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore`,
        (data: any) => {
            Dialog.showToast('为您发现了10条新数据~', { position: 68 });

            dispatch({ type: CHANGE_NEWSDATA_LOADING, loading: false });

            dispatch({ 
                type: RECEIVE_HOMENEWS_DATA, 
                payload: {
                    requestCode,
                    data,
                }
            });
        }
    );
};

export const fetchNewsDetail = (item: any) => (dispatch: Dispatch, state: () => Store) => {

    const { home: { htmlviews } } = state();

    /**
     * 判断是否已经请求过该篇文章
     */
    let token = false;

    for (const key in htmlviews) {
        if (key === item.docid) {
            token = true;
        }
    }

    if (token === false) {
        request(
            `http://c.m.163.com/nc/article/${item.docid}/full.html`,
            (data: any) => {
                // console.log('data: ', data);

                let { body } = data[item.docid];

                data[item.docid].img.map((item: any) => {
                    body = body.replace(item.ref, `<img src="${item.src}" />`);
                });

                data[item.docid].body = body;

                dispatch({
                    type: RECEIVE_NEWS_DETAIL,
                    newsDetail: {
                        item,
                        data,
                    }
                });
            }
        );
    } else {
        return;
    }
};

export const changeNewsDataLoading = (loading: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_NEWSDATA_LOADING, loading });
};