/**
 * created by Ghan
 */
import { 
    SAVE_SEARCH_HISTORY,
    EMPTY_SEARCH_HISTORY
} from '../constants/search';
import { 
    SearchActions,
} from '../action/search';
import { merge } from 'lodash';
import { Store } from './index';

export type HistoryType = Array<HistoryItem>;

export type HistoryItem = {
    keyword: string;
};

/**
 * history -- 搜索历史
 * firstToken -- 第一次进入的时候导入默认信息
 */
export type Search = {
    history: HistoryType;
};

export const initState = {
    history: [
        {keyword: '景甜妈妈 张继科'},
        {keyword: '星巴克关闭店面'},
        {keyword: '魅族内讧'},
        {keyword: '老布什夫人去世'},
    ],
};

/**
 * 搜索页面 reducer
 *
 * @export
 * @param {Search} [state=initState] 初始化数据
 * @param {SearchActions} action 搜索页对应Action
 * @returns {Search}
 */
export default function search (state: Search = initState, action: SearchActions): Search {

    switch (action.type) {

        case SAVE_SEARCH_HISTORY:
            const { payload } = action;

            const { historyItem } = payload;
            
            const token = state.history.findIndex(item => item.keyword === historyItem.keyword);
            
            /* 不等于-1 说明在搜索历史中已经存在 */
            if (token !== -1) {
                state.history.splice(token, 1);
            }

            state.history.unshift(historyItem);

            /* 截取前四个 */
            state.history.length = 4;
           
            return merge({}, state, {});

        case EMPTY_SEARCH_HISTORY:
            state.history = [];
            return merge({}, state, {});
            
        default:
            return state;
    }
}

export const getHistory = (state: Store): HistoryType => state.search.history;