module.exports = {

  pool: {
    host: "bmn-web.jinr.ru",
    user: "calendar",
    password: "calendar",
    database: "calendardb",
    dialect: "postgres",
    port: "8443",
    max: 30,
    min: 0,
    idleTimeoutMillis: 260000000, /*  how long a client is allowed to remain idle before being closed */
    connectionTimeoutMillis: 2000
  },
  allowed: ['*'],
  secret: "secret-key-code",
  enable: true
};
