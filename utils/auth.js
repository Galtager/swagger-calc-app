const utils = require('./writer.js');
const jwt = require('jsonwebtoken');


exports.validateToken = function (req) {
    try {
        const authHeader = req.headers["authorization"];
        // Remove Bearer from string
        const token = authHeader && authHeader.replace(/^Bearer\s+/, "");
        //Checking if the token is null
        if (!token) {
            throw ("No Token Supplied")
        }
        //Verifying if the token is valid.
        const payload = jwt.verify(token, process.env.JWT_KEY)
        if (!payload.email) {
            throw ("Token is Not Valid")
        }

    } catch (error) {
        throw (utils.respondWithCode(401, { message: error }))
    }
}
