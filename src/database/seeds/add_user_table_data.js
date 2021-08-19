const { v4 } = require('uuid');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: v4(), 
          email: 'josefr@gmail.com',
          password: '123456',
        },
      ]);
    });
};
