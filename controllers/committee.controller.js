// server/controllers/committee.controller.js
const db = require("../models");
const Committee = db.committees;
const User = db.users;
const Event = db.events;

exports.createCommittee = async (req, res) => {
  try {
    const committee = await Committee.create({
      name: req.body.name,
      description: req.body.description,
      chair_id: req.body.chairId
    });

    if (req.body.members) {
      await committee.setMembers(req.body.members);
    }

    // Fetch the created committee with its relationships
    const createdCommittee = await Committee.findByPk(committee.id, {
      include: [
        {
          model: User,
          as: 'chair',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] }
        }
      ]
    });

    res.status(201).json(createdCommittee);
  } catch (err) {
    console.error('Error creating committee:', err);
    res.status(500).json({ 
      message: "Failed to create committee",
      error: err.message 
    });
  }
};

exports.getAllCommittees = async (req, res) => {
  try {
    const committees = await Committee.findAll({
      include: [
        {
          model: User,
          as: 'chair',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] }
        },
        {
          model: Event,
          attributes: ['id', 'name', 'date']
        }
      ]
    });
    res.json(committees);
  } catch (err) {
    console.error('Error fetching committees:', err);
    res.status(500).json({ 
      message: "Failed to fetch committees",
      error: err.message 
    });
  }
};

// Add more controller methods...