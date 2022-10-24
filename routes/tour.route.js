const express = require('express')
const router = express.Router()
 const tourControllers = require('../controllers/tours.controllers')

// router.route("/bulk-update").patch(productController.bulkUpdateProduct);
// router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router.route('/')
// .get(productController.getProducts)
.post(tourControllers.createTour)

// router.route("/:id")
// .patch(productController.updateProductById)
// .delete(productController.deleteProductById)

module.exports = router