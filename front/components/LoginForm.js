import { Form,Input } from 'antd';
import { useCallback, useState } from 'react';

const LoginForm = ({setIsLoggedIn})=>{
    const [id,setId] = useState('');
    const [password,setPassword] = useState('');
    const onSubmit = useCallback(()=>{
        console.log(id,password)
        setIsLoggedIn(true);
    },[id,password])

    const onChangeId = useCallback((e)=>{
        setId(e.target.value);
    },[])
    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value);
    },[])
    
    return (
        <Form onFinish={onSubmit}>
            <div>
                <label htmlFor="user-id"/>
                <Input name="user-id" value={id} onChange={onChangeId} placeholder="아이디를 입력해주세요." required/>
            </div>
            <div>
                <label htmlFor="user-password"/>
                <Input 
                name="user-password" 
                type="password" 
                value={password} 
                onChange={onChangePassword} 
                placeholder="비밀번호를 입력해주세요."
                required/>
            </div>       
            <button type="submit">로그인</button>     
        </Form>
    )
}

export default LoginForm;