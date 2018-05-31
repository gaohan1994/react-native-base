import * as constants from '../constants/hello';
import { Dispatch } from 'redux';

export interface Increment {
    type: constants.RECEIVE_INCREMENT;
}

export interface Decrement {
    type: constants.RECEIVE_DECREMENT;
}

export type IndexActions = Increment | Decrement;

export const increment = () => (dispatch: Dispatch) => {
    dispatch({type: constants.RECEIVE_INCREMENT});
};

export const decrement = () => (dispatch: Dispatch) => {
    dispatch({type: constants.RECEIVE_DECREMENT});
};