module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
		  type: Sequelize.STRING
	  },
	  last_name: {
		  type: Sequelize.STRING
	  },
	  email: {
      type: Sequelize.STRING,
      unique: true
	  },
	  password: {
		  type: Sequelize.STRING
    },
    role: {
		  type: Sequelize.STRING
    }
  }, {
    timestamps: false,
  }
  );
	
	return User;
}


/* const pg = require('pg');
let cfg = require('../config/config');
var pool = new pg.Pool(cfg.pg_config);

module.exports.getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
module.exports.getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } */
  /* CREATE */
/*   module.exports.createUser = (request, response) =>  {
    const { name, email } = await request.body
  
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${result.insertId}`)
    })
  } */
  /* PUT */
/*   module.exports.updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
  } */
  /* DELETE */
/*   module.exports.deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
  }
  */