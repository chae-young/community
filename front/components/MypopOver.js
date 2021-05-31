import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import {PopoverWrap,PopoverProfile,PopoverInfo,PopoverBtn} from '../styles/style';

const MypopOver = ({options})=>{
    const handleClose = () => {
        options.setAnchorEl(null);
    };
    return(
        <Popover
            id={options.id}
            open={options.open}
            anchorEl={options.anchorEl} 
            onClose={handleClose}     
        >
            <PopoverWrap>
                <PopoverProfile>
                    <div className="profile__img">
                        <Avatar alt="내 프로필 사진" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg/375px-171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg" width="10%" />
                    </div>
                    <PopoverInfo>
                        <Link href="/Mypage"><a className="nick">닉네임</a></Link>
                        <span className="id">아이디</span>
                        <button>로그아웃</button>
                    </PopoverInfo>
                </PopoverProfile>
                <PopoverBtn>
                    <button>팔로워</button>
                    <button>팔로잉</button>
                </PopoverBtn>
            </PopoverWrap>
        </Popover>        
    )
}

export default MypopOver;