import { useSelector } from "react-redux";

const PostList = ()=>{
    const {mainPosts} = useSelector(state=>state.post);
    //const {post} = mainPosts;

    return(
        <ul>
            {mainPosts.map((v)=>(
                <li>
                    <div><img src={v.Images[0].src}/></div>
                    <p>{v.post.title}</p>
                    <span>댓글{v.Comments.length}</span>
                </li>
            ))}
        </ul>
    )
}

export default PostList;