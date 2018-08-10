import { 
    RECEIVE_HOMENEWS_DATA,
    CHANGE_NEWSDATA_LOADING,
} from '../constants/home';
import { 
    HomeActions,
} from '../action/Home';
import { merge } from 'lodash';

export const initState = {
    history: []
};

export type Search = {
    history: string[];
};

export default function search (state: Search = initState, action: HomeActions): Search {

    switch (action.type) {

        default:
            return state;
    }
}