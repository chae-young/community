import { useCallback, useState } from 'react';
import {useDispatch} from 'react-redux';
import useInput from '../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import { LoginAction } from '../reducers/user';

const useStyle = makeStyles((theme) => ({
    bg: {
        background: "rgb(249, 137, 15)",        
        '&:hover': {
            background:'rgb(253, 206, 156)',
         },        
    },
}));

const LoginForm = ({setLoginOn})=>{
    const dispatch = useDispatch();
    const classes = useStyle();

    const [id,onChangeId] = useInput('');
    const [password,onChangePassword] = useInput('');
    const onSubmit = useCallback((e)=>{
        e.preventDefault()
        console.log(id,password)
        dispatch(LoginAction({id,password}));
        setLoginOn(false);
    },[id,password])

    return (
        <form onSubmit={onSubmit}>
            <div className="aside__input-field">
                <TextField 
                id="user-id" 
                label="아이디" 
                value={id} 
                onChange={onChangeId} 
                fullWidth 
                required/>
            </div>
            <div className="aside__input-field">
                <TextField 
                type="password" 
                id="user-password" 
                label="비밀번호" 
                value={password} 
                onChange={onChangePassword} 
                fullWidth 
                required/>
            </div>                  
            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.bg}>로그인</Button>   
        </form>
    )
}

export default LoginForm;