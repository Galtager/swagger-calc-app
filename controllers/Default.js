'use strict';

const utils = require('../utils/writer.js');
const AuthService = require('../service/AuthService');
const CalcService = require('../service/CalcService');
const authUtils = require('../utils/auth');

module.exports.postAuth = async function postAuth(req, res, next, body) {
  let response;
  try {
    response = await AuthService.postAuth(body)
  } catch (error) {
    response = error
  }
  finally {
    utils.writeJson(res, response);
  }
};

module.exports.postCalc = async function postCalc(req, res, next, body, op) {
  let response;
  try {
    // this function throw error if jwt token is invalid - used as middleware 
    authUtils.validateToken(req)
    response = await CalcService.postCalc(body, op)
  } catch (error) {
    response = error
  } finally {
    utils.writeJson(res, response);
  }
};
