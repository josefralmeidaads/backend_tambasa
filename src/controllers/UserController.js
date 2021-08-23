const connection = require('../database');
const bcrypt = require('bcryptjs');
const { v4 } = require('uuid');
const { request , response } = require('express');

module.exports = {
  async index(req = request, res = response, next) {
    try{
      const users = await connection('users').select().from('users')
      return res.json({users, userId :req.userId});
    }catch(error){
      next(error)
    }
  },

  async storage(req = request, res = response, next){
    const { name, email, password } = req.body
    const id = v4()
    const hash = await bcrypt.hash(password, 10);
    try{
      await connection('users').insert({
        id,
        name,
        email,
        password: hash
      })
      return res.status(201).json({ message: "Usuário cadastrado com sucesso!" })
    }catch(err){
      next(err)
    }
  }
}