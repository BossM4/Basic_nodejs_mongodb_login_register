const express = require('express')
const app = express()
const ejs =require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const port = 4000;

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:Ab12345678@cluster0.nf7eqr1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

global.loggedIn = null

//controllers
const indexController = require('./controllers/indexController.js')
const loginController = require('./controllers/loginController.js')
const registerController = require('./controllers/registerController.js')
const storeUserController = require('./controllers/storeUserController.js')
const loginUserController = require('./controllers/loginUserController.js')
const logoutController = require('./controllers/logoutController.js')
const homeController = require('./controllers/homeController.js')

//Middlewares
const redirectIfAuth = require('./middleware/redirectIfAuth.js')
const authMiddleware = require('./middleware/authMiddleware.js')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
})
app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectIfAuth, loginController)
app.get('/register', redirectIfAuth, registerController)
app.post('/user/register', redirectIfAuth,  storeUserController)
app.post('/user/login', redirectIfAuth, loginUserController)
app.get('/logout', logoutController)


app.listen(port, () => {
    console.log(`Application listening on port : ${port}`)
})


