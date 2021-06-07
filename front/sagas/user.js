import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import{
    LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
} from '../reducers/user';

function* login(action){
    try{
        yield delay(1000);
        yield put({
            type:LOG_IN_SUCCESS,
            data:action.data
        })
    }catch(err){
        console.error(err);
        yield put({
            type:LOG_IN_FAILURE,
            data:err.response.data,
        })
    }
}

function* watchLogin(){
    yield takeLatest(LOG_IN_REQUEST,login)
}

export default function* userSaga(){
    yield all([
        fork(watchLogin),
    ])
}