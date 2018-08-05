import {
    RECEIVE_VIDEO_DATA,
    CHANGE_VIDEO_LOADING,
} from '../constants/video';
import { Dispatch } from 'redux';
import request from '../util/fetch';

import { ThunkAction } from './type';

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
export function fetchVideoData (requestCode: string, page: number): ThunkAction {
    return dispatch => {
    
        try {
            dispatch({ type: CHANGE_VIDEO_LOADING, loading: true });
    
            request(
                `http://c.3g.163.com/nc/video/${requestCode}/${page}-10.html`,
                (data: any) => {
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
        } catch (err) {
            throw new Error(err.message || '');
        }
    }
} 

export const changeNewsDataLoading = (loading: boolean) => (dispatch: Dispatch) => {
    dispatch({ type: CHANGE_VIDEO_LOADING, loading });
};