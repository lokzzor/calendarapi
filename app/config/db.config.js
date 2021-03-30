module.exports = {

  pool: {
    /*  
    host: "localhost",
    user: "calendar",
    password: "calendar",
    database: "calendardb",
    port: "5432",
     */
    host: "bmn-web.jinr.ru",
    user: "calendar",
    password: "calendar",
    database: "calendardb",
    port: "8443",
    dialect: "postgres",
    max: 30,
    min: 0,
    idleTimeoutMillis: 2000, 
    connectionTimeoutMillis: 21000

  },
  allowed: ['*'],
  secret: "secret-key-code",
  enable: true
};
