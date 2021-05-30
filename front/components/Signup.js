import { useCallback, useState } from 'react';
import useInput from '../hooks/useInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorMsg} from '../styles/style';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    bg: {
        background:'red',
    },
}));

const Signup = ()=>{
    const classes = useStyle();    

    const [id,onChangeId] = useInput('');
    const [nickname,onChangeNickname] = useInput('');
    const [password,onChangePassword] = useInput('');

    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password]);

    const onSubmit = useCallback((e)=>{
        if(password !== setPasswordCheck){
            return setPasswordError(true);
        }
        console.log(id,nickname,password)
    },[password,passwordCheck])

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
                id="user-nickname" 
                label="닉네임" 
                value={nickname} 
                onChange={onChangeNickname} 
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
            <div className="aside__input-field">
                <TextField 
                type="password" 
                id="user-password-check" 
                label="비밀번호 확인" 
                value={passwordCheck} 
                onChange={onChangePasswordCheck} 
                fullWidth 
                required/>
                {passwordError && <ErrorMsg>비밀번호가 맞지 않습니다.</ErrorMsg>}
            </div>                       
            <Button variant="contained" color="primary" fullWidth className={classes.bg}>가입하기</Button>               
        </form>
    )
}

export default Signup;