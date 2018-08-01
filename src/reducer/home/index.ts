import { 
    RECEIVE_HOMENEWS_DATA
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
                state.newsList[requestCode] = data;
            }
           
            return merge({}, state, {});

        default:
            return state;
    }
}

export const getNewsList = (store: Store) => store.home.newsList;