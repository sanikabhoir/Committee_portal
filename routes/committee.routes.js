const controller = require("../controllers/committee.controller");
const authMiddleware = require("../middleware/auth.middleware");

module.exports = function(app) {
  app.post("/api/committees", [authMiddleware], controller.createCommittee);
  app.get("/api/committees", controller.getAllCommittees);
  app.get("/api/committees/:id", controller.getCommittee);
  app.put("/api/committees/:id", [authMiddleware], controller.updateCommittee);
  app.delete("/api/committees/:id", [authMiddleware], controller.deleteCommittee);
};
