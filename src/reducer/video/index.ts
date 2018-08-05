import { 
    RECEIVE_VIDEO_DATA,
    CHANGE_VIDEO_LOADING
} from '../../constants/video';
import { 
    VideoActions,
} from '../../action/video';
import { merge } from 'lodash';
import { Store } from '../type';
import { Video } from './type';
import initState from './state';

export default function video (state: Video = initState, action: VideoActions): Video {

    switch (action.type) {

        case RECEIVE_VIDEO_DATA:
            const { payload } = action;

            if (payload) {
                const { requestCode, data = [] } = payload;

                if (state.video[requestCode] && state.video[requestCode].length > 0) {
                    state.video[requestCode] = data[requestCode].concat(state.video[requestCode]);
                } else {
                    state.video[requestCode] = data[requestCode];
                }
            }
           
            return merge({}, state, {});

        case CHANGE_VIDEO_LOADING:
            const { loading } = action;
            state.loading = loading;
            return merge({}, state, {});

        default:
            return state;
    }
}

export const getVideo = (store: Store) => store.video.video;

export const getVideoLoading = (store: Store) => store.video.loading;