'use strict'

const jwt = require('jsonwebtoken');
const generateResponse = require('./../helpers/generate-response');

// middleware to decode token 
module.exports = (req, res, next) => {
  if (req.headers.jwtoken) {
    jwt.verify(req.headers.jwtoken, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err && err.name === 'TokenExpiredError') {
        const response = generateResponse(401, 'token expired', null, err);
        res.status(401).send(response);
      } else if (err && err.name === 'JsonWebTokenError') {
        const response = generateResponse(403, 'token error', null, err);
        res.status(403).send(response);
      } else if (err) {
        const response = generateResponse(401, 'token error', null, err);
        res.status(401).send(response);
      } else if (!user.username || !user.id){
        const response = generateResponse(401, 'false token', null, err);
        res.status(401).send(response);
      } else {
        req.headers.user = user;
        next();
      }
    });
  } else { // double check dude, always double check
    const response = generateResponse(401, 'have not signed up/signed in', null, 'Authentication error');
    res.status(401).send(response);
  }
}