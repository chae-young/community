import produce from 'immer';

export const initialState = {
    postList: [{
        id: 1,
        User: {
            id: 1,
            ninckname: 'cy',
        },
        post: {
            title: '제목',
            content: '첫번째게시글',
        },
        Images: [
            {src: 'https://img.hankyung.com/photo/201906/20190605152133_5cf75f6ce454e_1.jpg'},
            {src: 'https://img.tvreportcdn.de/cms-content/uploads/2020/09/07/f5051028-1a05-4c35-9657-ed6167d5e17b.jpg'},
            {src: 'https://img.tvreportcdn.de/cms-content/uploads/2020/09/07/f5051028-1a05-4c35-9657-ed6167d5e17b.jpg'},
        ],
        Comments: [
            {
                User: { nickname: 'cy' },
                content: 'goob!',
            },
        ],
    }],
    imagePaths: [],
    postAddLoading: false,
    postAddDone: false,
    postAddError: null,
};

const dummyPost = (data) => (
    {
        id: 1,
        User: {
            id: 2,
            nickname: '더미닉넴',
        },
        post: {
            title: data.title,
            content: data.content,
        },
        Images: [],
        Comments: [],
    }
);

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            draft.postAddLoading = true;
            draft.postAddDone = false;
        break;
        case ADD_POST_SUCCESS:
            draft.postAddLoading = false;
            draft.postAddDone = true;
            draft.postList.unshift(dummyPost(action.data));
        break;
        case ADD_POST_FAILURE:
            draft.postAddDone = false;
            draft.postAddError = action.error;
        break;
        default:
        break;
    }
});

export default reducer;
