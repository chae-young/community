const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

const db = require('./models');
// const postRouter = require('./routes/post');
// const postsRouter = require('./routes/posts');
const movieRouter = require('./routes/movie');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

const app = express();
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공')
    })
    .catch(console.error);

passportConfig();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(morgan('dev'))
// cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', userRouter);
app.use('/movie', movieRouter);

app.listen(3063,()=>{
    console.log('서버 실행 중');
});