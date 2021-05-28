import { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {btnStyle} from '../styles/MakeStyle';

const LoginForm = ({setIsLoggedIn})=>{
    const btnClass = btnStyle();

    const [id,onChangeId] = useInput('');
    const [password,onChangePassword] = useInput('');
    const onSubmit = useCallback(()=>{
        console.log(id,password)
        setIsLoggedIn(true);
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
            <Button variant="contained" color="primary" fullWidth className={btnClass.bg}>로그인</Button>   
        </form>
    )
}

export default LoginForm;