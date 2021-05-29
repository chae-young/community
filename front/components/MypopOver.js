import Popover from '@material-ui/core/Popover';

const MypopOver = ({id,open,anchorEl})=>{

    return(
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}        
        >
            마이페이지
        </Popover>        
    )
}

export default MypopOver;