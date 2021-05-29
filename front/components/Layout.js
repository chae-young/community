import {useState,useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {UserOutlined,SearchOutlined} from '@ant-design/icons';
import {Header} from '../styles/style';
import LoginForm from './LoginForm';
import Signup from './Signup';
import MypopOver from './MypopOver';

const Layout = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState('');

    const [isToggleOn,setIsToggleOn] = useState(true);
    const onToggle = useCallback(()=>{
        setIsToggleOn((prev)=>!prev);
    },[isToggleOn])

    const [loginOn,setLoginOn] = useState(null);
    const loginOnClick = useCallback((e)=>{
        if(isLoggedIn) setAnchorEl(e.currentTarget);
        setLoginOn(true);
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
        <Header>
            <nav>
                <ul className="header__util-menu">
                    <li>
                        <button aria-describedby={id} type="button" variant="contained" onClick={loginOnClick}>
                            {isLoggedIn ? '내프로필사진예정' : <UserOutlined />}
                        </button>
                        <MypopOver id={id} open={open} anchorEl={anchorEl}/>
                    </li>
                    <li><button type="button"><SearchOutlined /></button></li>
                </ul>
            </nav>
            <aside className={loginOn ? "is--open" : null}>
                계정이 없으신가요?<button onClick={onToggle}>{isToggleOn ? "회원가입하기" : "로그인하기"}</button>
                {isToggleOn ? <LoginForm setIsLoggedIn={setIsLoggedIn} setLoginOn={setLoginOn}/> : <Signup/>}
            </aside>
        </Header>
        {children} 
        </>
    )
}

Layout.propTypes = {
    children:PropTypes.node.isRequired,
}

export default Layout