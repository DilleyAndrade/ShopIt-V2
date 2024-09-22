import Product from '../models/product.js'
import ErrorHandler from '../utils/errorHandler.js'
import catchAsyncError from '../middlewares/catchAsyncError.js'
import APIFilters from '../utils/apiFilters.js'

//Create new product => /api/v1/admin/products
export const newProduct = catchAsyncError (async (req, res) =>{

  const product = await Product.create(req.body)

  res.status(200).json({
    message: 'Product created',
    products,
  })
})

//Read all product => /api/v1/products
export const getProducts = catchAsyncError (async (req, res) =>{

  const apiFilters = new APIFilters(Product, req.query).search()

  let products = await apiFilters.query
  let filteredProductsCount = await products.length

  res.status(200).json({
    filteredProductsCount,
    products
  })
})


//Get single product details  => /api/v1/products/:id
export const getProductDetail = catchAsyncError (async (req, res, next) =>{
  const product = await Product.findById(req.params.id)

  if(!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  res.status(200).json({
    product
  })
})

//Update product details  => /api/v1/products/:id
export const updateProduct = catchAsyncError (async (req, res) =>{
  let product = await Product.findById(req.params.id)

  if(!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  product = await Product.findByIdAndUpdate(
    req.params.id, req.body, { new: true }
  )

  res.status(200).json({
    product
  })
})

//Delete product  => /api/v1/products/:id
export const deleteProduct = catchAsyncError (async (req, res) =>{
  const product = await Product.findById(req.params.id)

  if(!product) {
    return next(new ErrorHandler('Product not found', 404))
  }

  await product.deleteOne()

  res.status(200).json({
    messae: "Product deleted"
  })
})