const express = require('express');
const { optionalAuth } = require('../../middleware/auth');
const {
  getTechProfileDisplay,
} = require('../../controllers/CurrentVersion/User/TechProfile.controller');
const {
  getProfiles: getConversationalProfiles,
  getAvailableTests: getAvailableConversationalTests,
  getIRIProfiles,
} = require('../../controllers/CurrentVersion/User/ConversationalProfile.controller');

const router = express.Router();

router.get('/tech-profiles/display', optionalAuth, getTechProfileDisplay);

// Conversational Profile routes
router.get('/conversational-profiles/tests', optionalAuth, getAvailableConversationalTests);
router.get('/conversational-profiles/:testName', optionalAuth, getConversationalProfiles);
// Backward compatibility route for IRI
router.get('/iri/profiles', optionalAuth, getIRIProfiles);

module.exports = router;
