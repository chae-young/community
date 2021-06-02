import {useState,useCallback, useEffect} from 'react';
import {UserOutlined,SearchOutlined} from '@ant-design/icons';
import Link from 'next/link';
import {HeaderWrap,Aside} from '../styles/style';
import LoginForm from './LoginForm';
import Signup from './Signup';
import MypopOver from './MypopOver';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';

const Header = ()=>{
    const {isLoggedIn} = useSelector((state)=>state.user);

    const [isToggleOn,setIsToggleOn] = useState(true);
    const onToggle = useCallback(()=>{
        setIsToggleOn((prev)=>!prev);
    },[isToggleOn])

    const [loginOn,setLoginOn] = useState(null);
    const loginOnClick = useCallback((e)=>{
        if(isLoggedIn) {
            setLoginOn(false);
            setAnchorEl(e.currentTarget);
            return;
        }
        setLoginOn(true);
    })

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <HeaderWrap>
            <h1><Link href="/"><a>로고</a></Link></h1>
            <nav>
                <ul className="header__util-menu">
                    <li>
                        <button type="button" variant="contained" onClick={loginOnClick}>
                            {isLoggedIn ? '내프로필사진예정' : <UserOutlined />}
                        </button>
                        <MypopOver options={{id,open,anchorEl,setAnchorEl}}/>
                    </li>
                    <li><button type="button"><SearchOutlined /></button></li>
                </ul>
            </nav>
            <Aside toggle={loginOn}>
                계정이 없으신가요?<button onClick={onToggle}>{isToggleOn ? "회원가입하기" : "로그인하기"}</button>
                {isToggleOn ? <LoginForm setLoginOn={setLoginOn}/> : <Signup/>}
            </Aside>
        </HeaderWrap>        
    )
}

export default Header;