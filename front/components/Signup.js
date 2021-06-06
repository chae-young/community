import { useCallback, useState } from 'react';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    bg: {
        background:'red',
    },
}));

const Signup = ()=>{
    const classes = useStyle();    

    const { register, handleSubmit , watch ,formState: { errors } } = useForm();
    const onSubmit = (data)=>{
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
                {...register("password",{
                    minLength: 8            
                })} 
                fullWidth 
                required/>
                {console.log(errors?.password?.type)}
                {errors?.password?.type === "minLength" && (<p>비밀번호 8자 이상으로 입력해주세요.</p>)}
            </div>   
            <div className="aside__input-field">
                <TextField 
                type="password" 
                id="user-password-check" 
                label="비밀번호 확인" 
                {...register("passwordCheck",{
                    validate: value => value === watch('password')          
                })} 
                fullWidth 
                required/>  
                {errors?.passwordCheck?.type === "validate" && (<p>비밀번호가 틀립니다.</p>)} 
            </div>                       
            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.bg}>가입하기</Button>               
        </form>
    )
}

export default Signup;