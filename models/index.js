const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: console.log // Set to false to disable SQL logging
  });
  
  // Test the connection
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  // Import models
db.users = require("./user.model.js")(sequelize, Sequelize);
db.committees = require("./committee.model.js")(sequelize, Sequelize);
db.events = require("./event.model.js")(sequelize, Sequelize);

// Define relationships
db.committees.belongsToMany(db.users, { 
  through: 'committee_members',
  as: 'members'
});
db.users.belongsToMany(db.committees, { 
  through: 'committee_members',
  as: 'committees'
});

// Chair relationship
db.committees.belongsTo(db.users, { 
  foreignKey: 'chair_id',
  as: 'chair'
});

// Events relationship
db.committees.hasMany(db.events, {
  foreignKey: 'committee_id'
});
db.events.belongsTo(db.committees);

module.exports = db;