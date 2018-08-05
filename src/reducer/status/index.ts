import { 
    CHANGE_STATUSBAR_THEME
} from '../../constants/status';
import { 
    StatusActions,
} from '../../action/status';
import { merge } from 'lodash';
import { Store } from '../type';
import { Status } from './type';
import initState from './state';

export default function status (state: Status = initState, action: StatusActions): Status {

    switch (action.type) {

        case CHANGE_STATUSBAR_THEME:
            const { theme } = action;

            if (theme) {
                state.statusBarTheme = theme;
            }
            return merge({}, state, {});

        default:
            return state;
    }
}

export const getStatusBarTheme = (state: Store) => state.status.statusBarTheme;