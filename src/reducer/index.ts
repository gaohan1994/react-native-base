import { combineReducers } from 'redux';
import hello from './hello';
import home from './home';
import video from './video';
import status from './status';

export default combineReducers({
    hello,
    home,
    status,
    video,
});