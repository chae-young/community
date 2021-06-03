export const initialState = {
    mainPosts:[{
        id:1,
        User:{
            id:1,
            ninckname:'cy'
        },
        content:"첫번쨰 게시글",
        Image:[
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

const reducer = (state=initialState,action)=>{
    switch(action.type){
        default:
            return state;
    }
}

export default reducer;