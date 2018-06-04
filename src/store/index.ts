
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

const configureStore = () => {
    
    const store = (__DEV__ === false)
        ? createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk)
            )
        )
        : createStore(
            rootReducer,
            compose(
                applyMiddleware(thunk, createLogger)
            )
        );
        
    return store;
};

export default configureStore;