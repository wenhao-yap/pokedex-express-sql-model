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
        const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [
          user.name,
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
      const queryString = 'SELECT * from users WHERE id=$1';
      const values = [id];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    login: (inputInfo, callback) => {
      // TODO: Add logic here
      const queryString = "SELECT password from users WHERE name='" + inputInfo.name + "'";

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
