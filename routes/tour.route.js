const express = require('express')
const router = express.Router()
 const tourControllers = require('../controllers/tours.controllers')
const viewCount = require('../middleware/viewcount')

// router.route("/bulk-update").patch(productController.bulkUpdateProduct);
// router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router.route('/')
.get(tourControllers.getTours)
.post(tourControllers.createTour)

 router.route("/:id")
 .get(viewCount,tourControllers.getTourByID)
.patch(tourControllers.updateTourById)
// .delete(productController.deleteProductById)

module.exports = router