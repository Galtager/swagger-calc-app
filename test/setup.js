const jwt = require('jsonwebtoken');

exports.getAuthToken = () => {
    const payload = { email: 'test@test.com' }
    const token = jwt.sign(payload, process.env.JWT_KEY)
    return token;
}