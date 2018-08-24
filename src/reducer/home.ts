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
    imageUrls: {},
};

export type Home = {
    newsList: any;
    loading: boolean;
    htmlviews: any;
    imageUrls: any;
};

export default function hello (state: Home = initState, action: HomeActions): Home {

    switch (action.type) {

        /**
         * 接收到主页数据之后把数据存起来
         * 根据 requestCode
         */
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

        /**
         * 改变 loading 状态
         */
        case CHANGE_NEWSDATA_LOADING:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});

        /**
         * 收到具体某条数据的时候进行处理把数据存储到 redux 中
         * 1.htmlview
         * 2.images
         */
        case RECEIVE_NEWS_DETAIL:
            const { newsDetail } = action;

            if (newsDetail) {
                const { data, item } = newsDetail;

                state.htmlviews[item.docid] = data[item.docid];

                if (data[item.docid].img && data[item.docid].img.length > 0) {

                    const imageUrls = data[item.docid].img.map((url: { src: string }) => ({
                        url: url.src
                    }));
                    state.imageUrls[item.docid] = imageUrls;
                }
            }

            return merge({}, state, {});

        default:
            return state;
    }
}

export const getNewsList = (store: Store) => store.home.newsList;

export const getNewsLoading = (store: Store) => store.home.loading;

export const getHTMLViews = (store: Store, id: string) => store.home.htmlviews[id];

export const getImageUrls = (store: Store, id: string) => store.home.imageUrls[id];