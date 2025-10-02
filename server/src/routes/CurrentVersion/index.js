const express = require('express');
const { optionalAuth } = require('../../middleware/auth');
const {
  getTechProfileDisplay,
} = require('../../controllers/CurrentVersion/User/TechProfile.controller');

const router = express.Router();

router.get('/tech-profiles/display', optionalAuth, getTechProfileDisplay);

module.exports = router;
