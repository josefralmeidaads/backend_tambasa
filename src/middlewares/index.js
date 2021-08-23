const connection = require('../database');
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const { request, response } = require('express');

module.exports = {
  async auth(req = request , res = response, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || authHeader === "Bearer") return res.status(401).send('Token invalid');
    
    const parts = authHeader.split(" ");
    
    if(!parts.length === 2) return res.status(401).send('Token invalid');

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) res.status(401).send('Token Is Invalid Formated');

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if(err) return res.status(401).send('Error Token!')

      req.userId = decoded.id;
      return next();
    })
  }
}