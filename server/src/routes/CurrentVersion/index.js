const express = require('express');
const { optionalAuth } = require('../../middleware/auth');
const {
  getTechProfileDisplay,
} = require('../../controllers/CurrentVersion/User/TechProfile.controller');
const {
  getBigFiveProfiles,
} = require('../../controllers/CurrentVersion/User/BigFive.controller');
const {
  getIRIProfiles,
} = require('../../controllers/CurrentVersion/User/IRI.controller');

const router = express.Router();

router.get('/tech-profiles/display', optionalAuth, getTechProfileDisplay);
router.get('/big-five/profiles', optionalAuth, getBigFiveProfiles);
router.get('/iri/profiles', optionalAuth, getIRIProfiles);

module.exports = router;
