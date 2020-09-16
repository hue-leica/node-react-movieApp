const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const mongoose = require('mongoose');

// application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

// application/json 
app.use(bodyParser.json());
app.use(cookieParser());

// 몽고 DB 연결
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

// uers / favorite 경로 지정
app.use('/api/users', require('./routes/users'));
app.use('/api/favorite', require('./routes/favorite'));

const port = 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))