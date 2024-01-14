const User = require('../models/User')

module.exports = (req, res, next) => {
    User.findById(req.session.userID).then((user) => {
        if (user) {
            return res.redirect('/home')
        }
        console.log('User logged in Successfully!')
        next()
    }).catch(error => {
        console.error(error)
    })
}