import { Dispatch } from 'redux';
import { HomeActions } from './Home';
import { VideoActions } from './video';
import { SearchActions } from './search';

export type Action = 
    | HomeActions
    | VideoActions
    | VideoActions;

/**
 * 自定义 Dispatch
 * 
 * CustomDispatch -- 项目中用到的 Dispatch 
 * 
 * & Dispatch 与官方包的Dispatch结合 防止 typescript 出错
 */
export type CustomDispatch = (
    action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type DispatchType = CustomDispatch & Dispatch;

export type GetState = () => Object;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;