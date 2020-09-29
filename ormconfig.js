const env = require("env-var");

module.exports = {
  "type": "postgres",
  "host": env.get('DB_HOSTNAME').required().asString(),
  "port": env.get('DB_PORT').required().asPortNumber(),
  "username": env.get('DB_USERNAME').required().asString(),
  "password": env.get('DB_PASSWORD').required().asString(),
  "database": env.get('DB_DATABASE').required().asString(),
  "synchronize": true,
  "logging": false,
  "entities": [
    "dist/entities/*{.js,.ts}"
  ],
  "migrations": [
    "dist/migration/*.js"
  ],
  "subscribers": [
    "dist/subscriber/*.ks"
  ]
}
