const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);
        console.log("new pass: " + user.password);
        console.log("new hash: " + hashed);

        // set up query
        const queryString = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
        const values = [
          user.username,
          user.email,
          hashed
        ];

        // execute query
        dbPool.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
      });
    },

    get: (id, callback) => {
      // set up query
      const queryString = 'select users.email, users.id, users.username, pokemons.name FROM ((user_pokemons\
        INNER JOIN pokemons ON user_pokemons.pokemon_id = pokemons.id)\
        INNER JOIN users ON user_pokemons.user_id = users.id)\
        WHERE users.id = ' + id;

      // execute query
      dbPool.query(queryString, (error, queryResult) => {
          console.log(queryResult.rows);
          callback(error, queryResult);
      });
    },

    login: (inputInfo, callback) => {
      // TODO: Add logic here
      const queryString = "SELECT password from users WHERE username='" + inputInfo.username + "'";

      dbPool.query(queryString,(error,queryResult) => {

        let storePass = queryResult.rows[0].password;
        // compare between plain text password and stored hashed password
        bcrypt.compare(inputInfo.password,storePass,(error, response) => {
            callback(error,response);
        })
      })
    }
  }
};
