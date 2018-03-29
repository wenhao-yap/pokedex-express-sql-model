/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (pokemon, callback) => {
      // set up query
      const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
        VALUES ($1, $2, $3, $4, $5) returning id`;
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height,
      ];
      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        const secondQuery = 'INSERT INTO user_pokemons (pokemon_id,user_id) VALUES (' + queryResult.rows[0].id + ',' + pokemon.user_id + ')';
        console.log(secondQuery);
        dbPool.query(secondQuery, (err,queryOutput) => {
          callback(err, queryResult);
        });  
      });
    },

    get: (id, callback) => {
      const values = [id];

      dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },

    update: (updatePoke, callback) =>{
      const queryString = 'Update pokemons Set id=$1,name=$2,num=$3,img=$4,weight=$5,height=$6 WHERE (id=$1)';
      const values = [
        updatePoke.id,
        updatePoke.name,
        updatePoke.num,
        updatePoke.img,
        updatePoke.weight,
        updatePoke.height,
      ];

      dbPool.query(queryString, values, (err, queryResult) => {
        // invoke callback function with results after query has executed
        callback(err, queryResult);
      });
    }

  };
};
