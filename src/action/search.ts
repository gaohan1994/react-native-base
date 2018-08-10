import { 
    SAVE_SEARCH_HISTORY,
    EMPTY_SEARCH_HISTORY
} from '../constants/search';
import { Dispatch } from 'redux';

export type SaveSearchHistoryItem = {
    type: SAVE_SEARCH_HISTORY;
    payload: any;
};

export type EmptySearchHistoryItems = {
    type: EMPTY_SEARCH_HISTORY;
};

export type SearchActions = SaveSearchHistoryItem | EmptySearchHistoryItems;

export const saveSearchHistoryItem = (item: any) => (dispatch: Dispatch): void => {
    dispatch({
        type: SAVE_SEARCH_HISTORY,
        payload: {
            historyItem: item
        }
    });
};

export const emptySearchHistoryItems = (item: any) => (dispatch: Dispatch): void => {
    dispatch({
        type: EMPTY_SEARCH_HISTORY
    });
};