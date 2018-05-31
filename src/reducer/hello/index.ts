import { 
    RECEIVE_DECREMENT,
    RECEIVE_INCREMENT
} from '../../constants/hello';
import { 
    IndexActions,
    increment,
    decrement
} from '../../action/hello';
import { merge } from 'lodash';
import { Store } from '../type';
import { Hello } from './type';
import initState from './state';

export default function hello (state: Hello = initState, action: IndexActions): Hello {

    switch (action.type) {

        case RECEIVE_INCREMENT:
            state.value += 1;
            return merge({}, state, {});

        case RECEIVE_DECREMENT:
            state.value -= 1;
            return merge({}, state, {});
        
        default:
            return state;
    }
}

export const getValue = (store: Store) => store.hello.value;