function authUser(req, res, next) {
    if(req.user == null) {
        res.status(403)
        return res.send('Musisz się zalogować')
    }
    next()
}

function authRole(role){
    return (req, res, next) => {
        if (req.user.role !== role){
            res.status(401)
            return res.send('Nie dozwolony')
        }
        next()
    }
}

module.exports = {
    authUser, 
    authRole
}