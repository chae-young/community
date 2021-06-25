import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { LoginRequestAction } from '../reducers/user';

const useStyle = makeStyles((theme) => ({
    bg: {
        background: "rgb(249, 137, 15)",        
        '&:hover': {
            background:'rgb(253, 206, 156)',
         },        
    },
}));

const LoginForm = ({setLoginOn})=>{
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const classes = useStyle();

    const onSubmit = (data) => {
        console.log(data);
        dispatch(LoginRequestAction({data}));
        setLoginOn(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="aside__input-field">
                <TextField 
                id="user-id" 
                label="아이디" 
                {...register("userid")} 
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
            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.bg}>로그인</Button>   
        </form>
    )
}

export default LoginForm;