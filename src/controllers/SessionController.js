const connection = require('../database');
const { request , response } = require('express');

module.exports = {
  async index(req = request, res = response) {
    const users = await connection('users').select().from('users')
    return res.json(users);
  },

  async storage(req = request, res = response){
    const { id } = req.body
    return res.json({ id });
  }
}