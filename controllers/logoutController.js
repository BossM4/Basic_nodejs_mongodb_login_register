module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
    console.log('User log Out Successfully!')
}