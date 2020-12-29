const express = require('express');
const router = express.Router();
const RouteController = require('../controllers/RouteController');

router.get('/countries/:pageNo/:resPerPage', RouteController.countries);
router.get('/addCountry', RouteController.addCountry);
module.exports = router;