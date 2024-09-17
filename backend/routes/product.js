import express from 'express'
import { getProductDetail, getProducts, newProduct } from '../controllers/productController.js'


const router = express.Router()

router.route("/products").get(getProducts)

router.route("/products/:id").get(getProductDetail)

router.route("/admin/products").post(newProduct)

export default router