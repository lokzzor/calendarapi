module.exports = {

  pool: {
    host: "bmn-web.jinr.ru",
    user: "calendar",
    password: "calendar",
    database: "calendartest2",
    dialect: "postgres",
    port: "8443",
    max: 10,
    min: 0,
    idleTimeoutMillis: 260000000, /*  how long a client is allowed to remain idle before being closed */
    connectionTimeoutMillis: 2000
  },
  url: 'ldap://bmn-ipa.jinr.ru:389',
  realm: 'JINR.RU',
  base: 'cn=accounts,dc=jinr,dc=ru',
  users: 'cn=users, cn=accounts,dc=jinr,dc=ru',
  groups: 'cn=groups, cn=accounts,dc=jinr,dc=ru',
  admin_group: 'bmnunidbwriter',
  guest_group: 'bmnunidbreader',
  allowed: ['*'],
  secret: "secretcode",
  enable: true
};
