const connection = require('../database');
const jwt = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { request, response } = require('express');
const authConfig = require('../config/auth.json');

module.exports = {
  async create(req = request, res = response, next){
    const { email, password } = req.body;
    try{
      const user = await connection('users').where({ email }).first()

      if(!user) throw new Error('Email de usuário não cadastrado!')

      const confirmPassword = await compare(password, user.password);

      if(!confirmPassword) throw new Error('Senha informada difere da cadastrada para este email');

      const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400,
      })

      await connection('users').where({ email }).update({
        token
      })

      const userToken = await connection('users').where({ email }).first()

      return res.json({ userToken });
    }catch(err){
      err.status = 400
      next(err)
    }
  } 
}