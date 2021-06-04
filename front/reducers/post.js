export const initialState = {
    mainPosts:[{
        id:1,
        User:{
            id:1,
            ninckname:'cy'
        },
        post:{
            title:'제목',
            content:'첫번째게시글'
        },
        Images:[
            {src:'https://img.hankyung.com/photo/201906/20190605152133_5cf75f6ce454e_1.jpg'},
            {src:'https://img.tvreportcdn.de/cms-content/uploads/2020/09/07/f5051028-1a05-4c35-9657-ed6167d5e17b.jpg'},
            {src:'https://img.tvreportcdn.de/cms-content/uploads/2020/09/07/f5051028-1a05-4c35-9657-ed6167d5e17b.jpg'}
        ],
        Comments:[
            {
                User:{ninkname:'cy'},
                content:'goob!'
            }
        ]}
    ],
    imagePaths:[],
    postAdded:false,
}

const dummyPost = {
    id:1,
    User:{
        id:2,
        nickname:'더미닉넴'
    },
    content:'ㅎㅎㅎㅎㅎ',
    Images:[],
    Comments:[],
}

const ADD_POST = 'ADD_POST';

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case ADD_POST:
            return{
                ...state,
                mainPosts:[dummyPost,...state.mainPosts]
            }
        default:
            return state;
    }
}

export default reducer;