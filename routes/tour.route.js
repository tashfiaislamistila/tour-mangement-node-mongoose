const express = require('express')
const router = express.Router()
 const tourControllers = require('../controllers/tours.controllers')
const viewCount = require('../middleware/viewcount')

router.route('/')
.get(tourControllers.getTours)
.post(tourControllers.createTour)

router.route('/cheapest')
.get(tourControllers.getCheapestTour)

 router.route("/:id")
.get(viewCount,tourControllers.getTourByID)
.patch(tourControllers.updateTourById)


module.exports = router