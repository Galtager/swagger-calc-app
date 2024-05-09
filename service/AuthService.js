'use strict';
const jwt = require('jsonwebtoken');


/**
 *
 * body AuthBody 
 * returns authResult
 **/
exports.postAuth = function (body) {
    return new Promise(function (resolve, reject) {
        const { email } = body;
        // Generate JWT
        const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "1800s" })
        console.log(token)
        resolve({ message: "You are logged in", token });
    });
}