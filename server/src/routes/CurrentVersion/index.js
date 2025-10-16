const express = require('express');
const { optionalAuth } = require('../../middleware/auth');
const {
  getTechProfileDisplay,
} = require('../../controllers/CurrentVersion/User/TechProfile.controller');
const {
  getBigFiveProfiles,
} = require('../../controllers/CurrentVersion/User/BigFive.controller');

const router = express.Router();

router.get('/tech-profiles/display', optionalAuth, getTechProfileDisplay);
router.get('/big-five/profiles', optionalAuth, getBigFiveProfiles);

module.exports = router;
