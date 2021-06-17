const express = require('express');
const cors = require('cors');

// const postRouter = require('./routes/post');
const movieRouter = require('./routes/movie');
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
const morgan = require('morgan');

// const db = require('./models');
// const postRouter = require('./routes/post');
// const postsRouter = require('./routes/posts');
// const userRouter = require('./routes/user');
// const passportConfig = require('./passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(morgan('dev'))
// cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

// app.use('/post', postRouter);
app.use('/movie', movieRouter);

app.listen(3065,()=>{
    console.log('서버 실행 중');
});