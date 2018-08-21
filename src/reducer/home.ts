import { 
    RECEIVE_HOMENEWS_DATA,
    CHANGE_NEWSDATA_LOADING,
    RECEIVE_NEWS_DETAIL,
} from '../constants/home';
import { 
    HomeActions,
} from '../action/Home';
import { merge } from 'lodash';
import { Store } from './index';

export const initState = {
    newsList: {},
    loading: false,
    htmlviews: {},
};

export type Home = {
    newsList: any;
    loading: boolean;
    htmlviews: any;
};

export default function hello (state: Home = initState, action: HomeActions): Home {

    switch (action.type) {

        case RECEIVE_HOMENEWS_DATA:
            const { payload } = action;

            if (payload) {
                const { requestCode, data = [] } = payload;

                if (state.newsList[requestCode] && state.newsList[requestCode].length > 0) {
                    state.newsList[requestCode] = data[requestCode].concat(state.newsList[requestCode]);
                } else {
                    state.newsList[requestCode] = data[requestCode];
                }
            }
           
            return merge({}, state, {});

        case CHANGE_NEWSDATA_LOADING:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});

        case RECEIVE_NEWS_DETAIL:
            const { newsDetail } = action;

            if (newsDetail) {
                const { data, item } = newsDetail;

                state.htmlviews[item.docid] = data[item.docid];
            }

            return merge({}, state, {});

        default:
            return state;
    }
}

export const getNewsList = (store: Store) => store.home.newsList;

export const getNewsLoading = (store: Store) => store.home.loading;

export const getHTMLViews = (store: Store) => store.home.htmlviews;