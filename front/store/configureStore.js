import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from '../reducers';
import createSagaMiddleWare from 'redux-saga';
import rootSaga from '../sagas';

const configuerStore = ()=>{ 
    const sagaMiddleWare = createSagaMiddleWare();
    const loggerMiddleware = ({dispatch,getState}) => (next) => (action) =>{
        console.log(action);
        return next(action);
    }
    const middleWares = [sagaMiddleWare,loggerMiddleware];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleWares))
    : composeWithDevTools(applyMiddleware(...middleWares))
    const store = createStore(reducer,enhancer);
    store.sagaTask = sagaMiddleWare.run(rootSaga);
    return store;
}

const wrapper = createWrapper(configuerStore,{
    debug:process.env.NODE_ENV === 'development',
});

export default wrapper;