const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");

const db = require("./models");
const passportConfig = require("./passport");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const movieRouter = require("./routes/movie");
const userRouter = require("./routes/user");

const app = express();
db.sequelize
    .sync()
    .then(() => {
        console.log("db 연결 성공");
    })
    .catch(console.error);

passportConfig();
dotenv.config();

app.use("/", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
if (process.env.NODE_ENV === "production") {
    app.use(morgan("combined"));
    app.use(hpp());
    app.use(helmet());
    // cors
    app.use(
        cors({
            origin: "https://emotion-feed.com",
            credentials: true,
        })
    );
} else {
    app.use(morgan("dev"));
    // cors
    app.use(
        cors({
            origin: true,
            credentials: true,
        })
    );
}

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        saveUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        proxy: true,
        cookie: {
            secure: true,
            httpOnly: true,
            domain:
                process.env.NODE_ENV === "production" && ".emotion-feed.com",
            maxAge: 3600000,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("hi");
});

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/posts", postsRouter);
app.use("/movie", movieRouter);

app.listen(3065, () => {
    console.log("서버 실행 중");
});
