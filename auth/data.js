const ROLE = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user',
    BASIC: 'basic'
}

module.exports = {
    ROLE: ROLE, 
    users: [
        {id: 1, name: 'Kyle', role: ROLE.ADMIN },
        {id: 2, name: 'Sally', role: ROLE.BASIC },
        {id: 2, name: 'Joe', role: ROLE.USER}
    ]
}