import express, { Router } from 'express';
import { optionalAuth } from '../../middleware/auth';
import { getTechProfileDisplay } from '../../controllers/CurrentVersion/User/TechProfile.controller';
import {
  getProfiles as getConversationalProfiles,
  getAvailableTests as getAvailableConversationalTests,
  getIRIProfiles,
} from '../../controllers/CurrentVersion/User/ConversationalProfile.controller';
import {
  getResourceBenchmarks,
  getResourceBenchmarkById,
} from '../../controllers/CurrentVersion/User/Resource.controller';

const router: Router = express.Router();

router.get('/tech-profiles/display', optionalAuth, getTechProfileDisplay);

// Conversational Profile routes
router.get('/conversational-profiles/tests', optionalAuth, getAvailableConversationalTests);
router.get('/conversational-profiles/:testName', optionalAuth, getConversationalProfiles);
// Backward compatibility route for IRI
router.get('/iri/profiles', optionalAuth, getIRIProfiles);

// Resource Benchmark routes
router.get('/resources/benchmarks', optionalAuth, getResourceBenchmarks);
router.get('/resources/benchmarks/:id', optionalAuth, getResourceBenchmarkById);

export default router;
