const express = require('express');
const { createScrapRequest, getScrapRequests, updateScrapRequestStatus } = require('../controllers/scrapController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createScrapRequest);
router.get('/', getScrapRequests);
router.patch('/:id/status', updateScrapRequestStatus);

module.exports = router;
