module.exports = {
  HOST: "localhost",
  USER: "committee_user",  // The MySQL user we created
  PASSWORD: "7083425096", // Your MySQL password
  DB: "committee_portal",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};