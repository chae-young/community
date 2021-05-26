import PropTypes from 'prop-types';
import Link from 'next/link';

const Layout = ({children})=>{
    return (
        <div>
            <ul>
                <li><Link href="/"><a>메인</a></Link></li>
                <li><Link href="/profile"><a>프로필</a></Link></li>
                <li><Link href="/signup"><a>회원가입</a></Link></li>
            </ul>
            {children}
        </div>
    )
}

export default Layout