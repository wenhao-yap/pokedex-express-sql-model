-- create pokemons table
CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  num varchar(255),
  name varchar(255),
  img varchar(255),
  weight varchar(255),
  height varchar(255)
);

-- create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username varchar(255),
  email varchar(255),
  password varchar(255)
);

CREATE TABLE IF NOT EXISTS user_pokemons (
  id SERIAL PRIMARY KEY,
  pokemon_id int REFERENCES pokemons(id),
  user_id int REFERENCES users(id)
);