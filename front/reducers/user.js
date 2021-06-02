export const initialState = {
    isLoggedIn:false,
    me:null,
}

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const LoginAction = (data) =>{
    return{
        type:'LOG_IN',
        data
    }
}
const reducer = (state=initialState,action)=>{
    switch(action.type){
        case LOG_IN:
            return{
                ...state,
                isLoggedIn:true,
                me:action.data
            }
        case LOG_OUT:
            return{
                ...state,
                isLoggedIn:false,
                me:action.data
            }            
        default:
            return state;
    }
}

export default reducer;