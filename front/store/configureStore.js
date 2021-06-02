import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reducers';

const configuerStore = ()=>{
    const middleWares = [];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWares))
    : composeWithDevTools(applyMiddleware(...middleWares))
    const store = createStore(reducer,enhancer);
    return store;
}

const wrapper = createWrapper(configuerStore,{
    debug:process.env.NODE_ENV === 'development',
});

export default wrapper;