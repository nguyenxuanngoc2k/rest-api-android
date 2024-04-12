const express = require('express')
const apiRoute = require('./routes');
const userSchema = require('./models/user-schema');
require('dotenv').config()
require('./models/mongo-provider')
const session = require('express-session');
const {authMiddlewareView} = require('./middleware')
const {loginDashboard, logOut} = require('./controller/user')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// use session
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: process.env.SECRET_KEY, 
  cookie: { maxAge: 60000 }}));

// set view and static for admin
app.use(express.static('public'))
app.set('view engine', 'ejs');

// middleware application routes

app.use((req, res, next) => {
  // console.log('Log system:', process.env)
  next()
})

app.get('/', function (req, res) {
    res.send('Api is running')
  })
  
app.use('/api', apiRoute)

// router view user admin

app.get('/dashboard',authMiddlewareView, async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/index',{users: users});
})

app.get('/login', async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/login',{users: users});
})

app.post('/dashboard/login', async function (req, res){
  // render form
  return loginDashboard(req, res)
})

app.get('/logout', async function (req, res){
  // render form
  return logOut(req, res)
})

app.get('/api*', function (req, res) {
    return res.json({'message': 'api not found'})
  })


app.listen(3000);