const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require('./routes/auth.routes')(app);
require('./routes/committee.routes')(app);

// Database initialization
db.sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const db = require("./models");

db.sequelize.sync({ force: false }) // Set force: true to recreate tables (WARNING: This deletes existing data!)
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });
  app.get('/api/test-db', async (req, res) => {
    try {
      await db.sequelize.authenticate();
      const dbStatus = {
        status: 'Connected',
        databaseName: db.sequelize.config.database,
        host: db.sequelize.config.host,
        models: Object.keys(db.sequelize.models)
      };
      res.json(dbStatus);
    } catch (error) {
      res.status(500).json({
        status: 'Failed',
        error: error.message
      });
    }
  });