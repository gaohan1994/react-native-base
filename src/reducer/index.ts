import { combineReducers } from 'redux';
import hello from './hello';
import home from './home';

export default combineReducers({
    hello: hello,
    home: home,
});