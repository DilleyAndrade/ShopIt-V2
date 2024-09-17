import express from 'express'
import { getProductDetail, getProducts, newProduct, updateProduct } from '../controllers/productController.js'


const router = express.Router()

router.route("/products").get(getProducts)

router.route("/products/:id").get(getProductDetail)

router.route("/admin/products").post(newProduct)

router.route("/products/:id").put(updateProduct)

export default router