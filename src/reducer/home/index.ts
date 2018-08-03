import { 
    RECEIVE_HOMENEWS_DATA,
    CHANGE_NEWSDATA_LOADING,
} from '../../constants/home';
import { 
    HomeActions,
    fetchNewsData
} from '../../action/Home';
import { merge } from 'lodash';
import { Store } from '../type';
import { Home } from './type';
import initState from './state';
import { FetchNewsData } from '../../action/Home';

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
            
        default:
            return state;
    }
}

export const getNewsList = (store: Store) => store.home.newsList;

export const getNewsLoading = (store: Store) => store.home.loading;