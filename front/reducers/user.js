export const initialState = {
    loginLoading:false,
    loginDone:false,
    loginError:null,
    logoutLoading:false,
    logoutDone:false,
    logoutError:null,    
    me:null,
}

export const LOG_IN_REQUEST = 'LOG_IN';
export const LOG_IN_SUCCESS = 'LOG_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT';
export const LOG_OUT_SUCCESS = 'LOG_OUT';
export const LOG_OUT_FAILURE = 'LOG_OUT';

export const LoginRequestAction = (data) =>{
    return{
        type:LOG_IN_REQUEST,
        data
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname:'챙',
    Followings:[{nickname:'j'}],
    Followers:[{nickname:'j'}]
})

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case LOG_IN_REQUEST:
            return{
                ...state,
                loginLoading:true,
                loginDone:false,
            }
        case LOG_IN_SUCCESS:
            return{
                ...state,
                loginLoading:false,
                loginDone:true,
                me:dummyUser(action.data)
            }
        case LOG_IN_FAILURE:
            return{
                ...state,
                loginLoading:false,
                loginError:action.error
            }                            
        case LOG_OUT_REQUEST:
            return{
                ...state,
                logOutLoading:true,
                logOutDone:false,
            }
        case LOG_OUT_SUCCESS:
            return{
                ...state,
                logOutLoading:false,
                logOutDone:true,
                me:null,
            }
        case LOG_OUT_FAILURE:
            return{
                ...state,
                logOutLoading:false,
                logOutError:action.error
            }                                 
        default:
            return state;
    }
}

export default reducer;