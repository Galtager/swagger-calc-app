'use strict';
const jwt = require('jsonwebtoken');


/**
 *
 * body AuthBody 
 * returns authResult
 **/
exports.postAuth = function (body) {
    const { email } = body;
    // Generate JWT
    const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "1800s" })
    return { message: "You are logged in", token };
}