const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    generateToken (id) {
        const token = jwt.sign({id},  process.env.JWT_HASH, { expiresIn: '30d' })
        return token
    }
}
