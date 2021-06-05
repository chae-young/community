import { useSelector } from "react-redux";
import {PostListLi} from '../styles/style';

const PostList = ()=>{
    const {mainPosts} = useSelector(state=>state.post);

    return(
        <ul>
            {mainPosts.map((v)=>(
                <PostListLi key={v.id}>
                    <div className="post-list__img"><img src={v.Images[0].src}/></div>
                    <div className="post-list__con">
                        <p>{v.post.title}</p>
                        <span>댓글{v.Comments.length}</span>
                    </div>
                </PostListLi>
            ))}
        </ul>
    )
}

export default PostList;