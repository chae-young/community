import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import {PopoverInfo} from '../styles/style';

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
            <PopoverInfo className="popover-info">
                <div className="popover-info-profile">
                    <div className="profile__img">
                        <Avatar alt="내 프로필 사진" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg/375px-171216_%EC%96%91%EC%84%B8%EC%A2%85_10.jpg" width="10%" />
                    </div>
                    <div className="profile-info">
                        <Link href="/Mypage"><a>닉네임</a></Link>
                        <span className="popover-info-id">아이디</span>
                        <button>로그아웃</button>
                    </div>
                </div>
                <div className="popover-info-follow">
                    <button>팔로워</button>
                    <button>팔로잉</button>
                </div>
            </PopoverInfo>
        </Popover>        
    )
}

export default MypopOver;