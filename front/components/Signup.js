import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
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

    const { register, handleSubmit ,formState: { errors }} = useForm();

    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e)=>{
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    },[password]);

    const onSubmit = (data)=>{
        if(password !== setPasswordCheck){
            return setPasswordError(true);
        }
        console.log(data)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="aside__input-field">
                <TextField 
                id="user-id" 
                label="아이디" 
                {...register("id")} 
                fullWidth 
                required/>
            </div>
            <div className="aside__input-field">
                <TextField 
                id="user-nickname" 
                label="닉네임" 
                {...register("nickname")}  
                fullWidth 
                required/>
            </div>            
            <div className="aside__input-field">
                <TextField 
                type="password" 
                id="user-password" 
                label="비밀번호" 
                {...register("password")} 
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
            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.bg}>가입하기</Button>               
        </form>
    )
}

export default Signup;