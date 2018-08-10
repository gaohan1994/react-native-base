import { 
    SAVE_SEARCH_HISTORY,
    EMPTY_SEARCH_HISTORY
} from '../constants/search';
import { 
    SearchActions,
} from '../action/search';
import { merge } from 'lodash';
import { Store } from './index';

export const initState = {
    history: []
};

export type Search = {
    history: string[];
};

export default function search (state: Search = initState, action: SearchActions): Search {

    switch (action.type) {

        case SAVE_SEARCH_HISTORY:
            const { payload } = action;

            const { historyItem } = payload;

            if (historyItem && typeof historyItem === 'string') {
                state.history.push(historyItem);
            } else {
                const { keyword } = historyItem;
                state.history.push(keyword);
            }

            return merge({}, state, {});

        case EMPTY_SEARCH_HISTORY:
            state.history = [];
            return merge({}, state, {});
            
        default:
            return state;
    }
}

export const getHistory = (state: Store): string[] => state.search.history;