import {
    CHANGE_STATUSBAR_THEME
} from '../constants/status';
import { Dispatch } from 'redux';

export interface ChangeStatusBarTheme {
    type: CHANGE_STATUSBAR_THEME;
    theme?: string;
}

export type StatusActions = ChangeStatusBarTheme;

export const changeStatusBarTheme = (theme: string) => (dispatch: Dispatch): void => {
    dispatch({ type: CHANGE_STATUSBAR_THEME, theme });
};