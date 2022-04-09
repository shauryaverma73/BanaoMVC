// all module imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const auth = require('./controllers/middlewares');
const cookieParser = require('cookie-parser');
// Routers
const userRouter = require('./routes/userRoutes');
const postRouter = require('./routes/postRoutes');

// config file setting
dotenv.config({ path: './config.env' });

//json body parser in post requests and cookieparser
app.use(express.json());
app.use(cookieParser());


// db connection
mongoose.connect(process.env.DATABASE_STRING, () => {
    console.log('Database Connection Successful.');
});

// mounting of user router
app.use(userRouter);

// security middleware -- check if user logged in, all request after this middleware will check if user logged in
app.use(auth.isLoggedIn);

// mounting of postRouter
app.use(postRouter);

// server start
app.listen(8000, () => {
    console.log('Server Online at port 8000.');
});