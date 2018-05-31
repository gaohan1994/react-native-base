/// <reference path="./index.d.ts" />

import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';
import thunk from 'redux-thunk';

export const getEnvironment = () => process.env.NODE_ENV;

const configureStore = () => {

    const store = process.env.NODE_ENV === 'production'
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