<br>
<br>

# emotion (리뷰 서비스 프로젝트)

<br>
<br>
<br>
<br>

# 목차

## [프로젝트 소개](##👉-프로젝트-소개)<br>

## [폴더구조](##📁-폴더구조)<br>

## [stack](##👀-stack)<br>

## [Next.js 의 사용](##🔍-Next.js-의-사용)<br>

## [구현기능 및 동작 원리](##💻-구현기능-및-동작-원리)<br>

## [보완하고 싶은점](##🔨-보완하고-싶은점)<br>

## [프로젝트 문제 및 해결(MY TALK!)](<##🤷-프로젝트-문제-및-해결(MY-TALK!)>)<br>

<br>
<br>

## 👉 프로젝트 소개

<br>

영화,드라마,다큐 등을 보고 리뷰를 작성하여 사용자들끼리 공유하는 sns!

개발기간 : 7월 중 ~ 9월 중순 (약 두달) <br>
개발인원 : 1인 <br>
<br>

🎤 프로젝트 목적 및 동기

리액트를 사용한 sns강의를 듣고 나만의 sns를 만들고 싶었다.
최대한 내가 생각한 방법으로 기능을 구현하였으며 redux-saga로 비동기 요청을 어떻게 하는지, rest API로 프론트에서 백으로 어떻게 데이터를 넘기는지에 대한 이해를 더 돕기위해 프로젝트를 진행하게되었다.

<br>
<br>

## 📁 폴더구조

</br>

front 와 back 분리 <br/>

**컴포넌트 폴더구조**<br/>
단일컴포넌트로 사용하다가 컴포넌트가 많아짐에 따라 폴더구조의 난항을 겪었다.
그래서 기능적으로 컴포넌트를 분리하는 법을 보았고 큰틀로 먼저 관련있는 컴포넌트 별로 폴더를 나누고 그 폴더 내에서 기능별로 하위폴더를 나누었다.

<br>
<br>

## 👀 stack

front : React,Next.js,Redux,Redux-saga,style-components,material-ui <br/>
back : espress.js,sequelize,mysql <br/>
deploy: aws

<br>
<br>

<br>
<br>

## 🔍 Next.js 의 사용

1. 왜 Next.js 를 사용하였는가

    - 사용자들이 사용하는 서비스 프로젝트이기 때문에 SEO에 유리하기 의해선 SSR을 구현해야한다. 하지만 react는 CSR 방식이기 때문에 SSR을 지원하는 Next.js 를 선택하였다.

<br/>

2. 어떻게 SSR을 구현하였나

```
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {

    context.store.dispatch({
      type: LOAD_USER_REQUEST,
    })
    context.store.dispatch(END)

    await context.store.sagaTask.toPromise()
    return { props: {} }
  },
)

```

-   getServerSideProps를 사용하였다. page 요청이 오면 getServerSideProps 가 먼저 실행이 되며 프론트가 서버에 데이터를 요청하여 미리 가져오도록 하였다. redux-saga를 사용하고 있기 때문에 wrapper(store)와 dispatch를 사용하여 데이터를 가져오도록 하였다.

</br>

3. 사용 후 느낀점

    Next.js 는 다양한 기능이 많았다. 특히 pages 폴더내에서 라우팅 되는게 편했던거 같다. 그리고 webpack 이 기본적으로 탑재 되어있는점..?! 도 좋았다.
    이번 프로젝트에서 next.js 의 여러가지 기능을 사용해 볼수 있어서 좋은 경험이었다.

<br>
<br>

## 💻 구현기능 및 동작 원리

</br>

**1. 게시물 글쓰기/수정 및 삭제**</br>

로그인 하면 게시물 글쓰기,수정이 가능하도록 함. <br/>
+react-hook-form 라이브러리 사용 (모든 form 태그)

-   form 컴포넌트에서 input 값 받아서 back 으로 전달
-   포스트 내에서 내가쓴글 이면 수정/삭제 가능
-   포스트 id와 현재 로그인 되어있는 user id 가 같으면 수정/삭제 메뉴가 보이도록 구현.
-   수정 일 경우 수정할 포스트 데이터 불러와 from 컴포넌트에 뿌려주기. (재사용)

<br>
<br>

**2. infiniteScroll 사용하여 게시글 불러오기**

처음 board 페이지 이동하면 10개의 게시글을 불러오며 스크롤 하면 10개씩 불러오도록 함

-   포스트의 마지막 id값이 10 이라면 id가 10 미만인 포스트가 불러오도록 설정
-   스크롤 할때마다 요청이 한번가고 성공이 한번오도록 flag와 각 데이터 loading값으로 조건 설정
-   infiniteScroll이 여러페이지에서 사용되기 때문에 custom hooks로 분리
-   dispatch 는 페이지마다 액션이 다르기때문에 각 페이지에 dispatch를 설정하도록 함

<br>
<br>

**3. 로그인/회원가입/로그아웃**

-   react-hook-from 라이브러리의 error기능을 이용하여 비밀번호가 8자 이상으로 입력되도록 체크
-   비밀번호 확인 체크
-   로그아웃시 메인페이지로 이동

<br>
<br>

**4. user 프로필/이미지,닉네임 수정**

로그인후 해당 아이콘 클릭하면 모달창이 나오며 닉네임 클릭시 해당 user 페이지로 이동함 </br>
user 프로필 이미지 클릭시 수정 페이지로 이동(이미지,닉네임 수정가능)

-   동적라우팅을 사용하여 router에서 보내주는 id로 해당 id 정보를 가져옴
-   저장 클릭시 수정된 내용 전송

<br>
<br>

**5. user가 등록한 게시글**

프로필 페이지에서 user가 등록한 게시글을 확인 할 수 있다 </br>

-   PostListContent 컴포넌트를 재사용 하였으며 infinitescroll hooks 사용
-   동적라우팅 사용하여 해당 id 게시글 불러오도록 함.

<br>
<br>

**6. 팔로잉/팔로우**

user들끼리 팔로잉 팔로우를 할수 있고 각 프로필 페이지에서 확인 가능</br>

-   user 객체 내 Follower,Folloing 프로퍼티 존재
-   로그인 한 id와 프로필 정보 user id 비교하여 팔로우 버튼 유무 구현.
-   팔로우 시 현재 user id 를 dispath
-   팔로우 리스트는 router의 params 값이 follow면 follow 리스트, following이면 followinf 리스트가 나오도록 구현.
-   처음 리스트는 20개씩, 스크롤 내리면 10개 씩 나오도록 함.

<br>
<br>

**7. 좋아요**

게시글에서 좋아요 기능 추가</br>

-   post 객체 내 Liker 프로퍼티 존재
-   로그인된 아이디와 게시글 아이디 비교하여 좋아요 유무 판단
-   좋아요 클릭시 post.Likers.length - 1 , 좋아요 취소시 post.Likers.length - 1 로 카운트 전달
-   db 에 각 포스트의 좋아요수 저장

<br>
<br>

**7. 댓글 수정/삭제**

게시글에서 댓글을 등록할수 있으며 내가 쓴 댓글일 경우 삭제 가능</br>

-   post 객체 내 Commnet 배열이 존재하며 각 user 아이디들이 객체로 저장
-   Commnet 배열의 user id와 로그인된 id 비교하여 댓글 수정/삭제 기능 유무 구현
-   댓글 등록시 현재 post id 전달
-   댓글 수정시 수정할 데이터 불러와 commentForm 컴포넌트에 뿌려줌
-   댓글 수정과 댓글등록 모두 CommnetFrom 컴포넌트 사용

<br>
<br>

**8. 검색**

단어 검색시 그 단어가 포함된 게시글 나오도록 검색기능 구현</br>

-   검색 단어를 입력하면 search 페이지로 이동
-   단어 params 로 전달
-   db에서 params로 전달된 단어가 포함되는 post를 가져오도록 search router 설정

<br>
<br>

**9. 공유하기/url 복사**

포스트 공유하기 </br>

-   카카오 API 로 카카오톡 공유하기
-   url복사 -> react-copy-to-clipboard 라이브러리 사용

</br>
</br>

## 🔨 보완하고 싶은점

</br>

-   좋아요 게시글</br>

    프로필 페이지에 내가 좋아요한 게시글을 불러오도록 추가하고싶다.
    작업당시 추가할 공간이 애매해 미뤘는데 추가하면 좋을것 같다.

    <br>

-   로딩속도

    ~~로딩속도가 살짝 느린거 같아서 문제가 무엇인지 찾는중이다..~~
    처음엔 saga throttle 기능을 사용하여 데이터를 가져왔었는데 로딩이 너무 느려서 takelatest 로 바꿨다.
    로딩 부분에 대해선 공부가 더 필요한것 같다.

    ++ js 용량 문제도 있어서 라이브러리를 트리쉐이킹 하거나 필요없는 코드 삭제

    <br>

-   스타일 컴포넌트 활용

    중복되는 스타일 컴포넌트를 어떻게 할지 고민이 많아서 styles/style.js 에 몰아놓고 작업을 했었는데 컴포넌트를 활용해서 작업을 했으면 좋았을것 같다.

<br>
<br>

## 🤷 프로젝트 문제 및 해결(MY TALK!)

</br>

-   page 폴더 내 구조 </br>

    page폴더 내 post랑 users 폴더에서 dynamic route 를 사용한 페이지가 많았다.
    그래서 여러 react를 사용한 사이트들을 참고하여 관련있는 폴더 내에서 기능별로 폴더를 나누었다.

<br>

-   웹 브라우저 동작원리

    프론트와 백엔드와 서로 연결되는 과정을 직접 해봄으로써 브라우저에서 보내는 오류들을 확인할수 있었다.
    cors라던지 쿠키가 이와 같은 오류를 일으켰다고 말할수 있다.
    로그인을 구현했는데 로그인이 계속 안되길래 한 이틀을 헤맸었다.
    알고보니 api 요청할때 withCredentials 설정을 해주었어야 했는데 이부분을 놓쳤었다. 그래도 그 이후로 잊지 않게되어서 공부가 된거같다..😂

<br>

-   배포

    지금까지 배포라는 걸 안해봐서 package.json에 production 설정하는게 이해가 안갔었다.
    배포 하게되면 보안문제도 신경을 써야하기 때문에 소스를 숨겨준다던지 등
    배포와 개발모드를 구별해주어야 하는 이유를 알게되었다.
