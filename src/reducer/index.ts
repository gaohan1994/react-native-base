import { combineReducers } from 'redux';
import home, { initState as HomeState, Home as HomeType } from './home';
import video, { initState as VideState, Video as VideoType } from './video';
import search, { initState as SearchState, Search as SearchType } from './search';

export default combineReducers({
    home,
    video,
    search,
});

export const initState = {
    HomeState,
    VideState,
    SearchState
};

export type Store = {
    home: HomeType;
    video: VideoType;
    search: SearchType;
};