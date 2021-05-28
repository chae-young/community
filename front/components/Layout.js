import {useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {UserOutlined,SearchOutlined} from '@ant-design/icons';
import {Header} from '../styles/style';
import LoginForm from './LoginForm';
import Signup from './Signup';

const Layout = ({children})=>{
    const [isLoggedIn,setIsLoggedIn] = useState('');

    const [isToggleOn,setIsToggleOn] = useState(true);
    const onToggle = useCallback(()=>{
        setIsToggleOn((prev)=>!prev);
    },[isToggleOn])

    const [myIconClick,setMyIconClick] = useState(false);
    const myIcon = useCallback(()=>{
        setMyIconClick(true);
    })
    return (
        <>
        <Header>
            <nav>
                <ul className="header__util-menu">
                    <li><button onClick={myIcon} type="button"><UserOutlined /></button></li>
                    <li><button type="button"><SearchOutlined /></button></li>
                </ul>
            </nav>
            <aside className={myIconClick ? "is--open" : null}>
                계정이 없으신가요?<button onClick={onToggle}>{isToggleOn ? "회원가입하기" : "로그인하기"}</button>
                {isToggleOn ? <LoginForm setIsLoggedIn={setIsLoggedIn}/> : <Signup/>}
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