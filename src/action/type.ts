import { HomeActions } from './home';
import { VideoActions } from './video';

export type Action = 
    | HomeActions
    | VideoActions;

export type Dispatch = (
    action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type GetState = () => Object;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;