import {
    RECEIVE_VIDEO_DATA,
    CHANGE_VIDEO_LOADING,
} from '../constants/video';
import { Dispatch } from 'redux';
import request from '../util/fetch';
import { ThunkAction } from './type';
import Dialog from '../class/dialogUtil';

export interface FetchVideoData {
    type: RECEIVE_VIDEO_DATA;
    payload?: {
        requestCode: string;
        data?: any;
    };
}

export interface ChangeVideoLoading {
    type: CHANGE_VIDEO_LOADING;
    loading: boolean;
}

export type VideoActions = FetchVideoData | ChangeVideoLoading;

/**
 * 请求数据接口
 * 
 * @param {Dispatch} dispatch
 */
export const fetchVideoData = (requestCode: string, page: number): ThunkAction => (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_VIDEO_LOADING, loading: true });

    request(
        `http://c.3g.163.com/nc/video/list/${requestCode}/n/${page}-10.html`,
        (data: any) => {
            Dialog.showToast('为您发现了10条新数据~', { position: 68 });

            dispatch({ type: CHANGE_VIDEO_LOADING, loading: false });

            dispatch({ 
                type: RECEIVE_VIDEO_DATA, 
                payload: {
                    requestCode,
                    data,
                }
            });
        }
    );
};

export const changeVideoDataLoading = (loading: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_VIDEO_LOADING, loading });
};