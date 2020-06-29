const env = require("env-var");

module.exports = {
  "type": "mysql",
  "host": env.get('DB_HOSTNAME').required().asString(),
  "port": 3306,
  "username": env.get('DB_USERNAME').required().asString(),
  "password": env.get('DB_PASSWORD').required().asString(),
  "database": env.get('DB_DATABASE').required().asString(),
  "synchronize": true,
  "logging": false,
  "entities": [
    "dist/entities/*.js"
  ],
  "migrations": [
    "dist/migration/*.js"
  ],
  "subscribers": [
    "dist/subscriber/*.ks"
  ]
}
