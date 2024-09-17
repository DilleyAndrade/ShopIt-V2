import Product from '../models/product.js'

//Read all product => /api/v1/products
export const getProducts = async (req, res) =>{
  const products = await Product.find()

  res.status(200).json({
    products
  })
}

//Get single product details  => /api/v1/products/:id
export const getProductDetail = async (req, res) =>{
  const product = await Product.findById(req.params.id)

  if(!product) {
    return res.status(404).json({
      error: "Product not found"
    })
  }

  res.status(200).json({
    product
  })
}

//Create new product => /api/v1/admin/products
export const newProduct = async (req, res) =>{
  const product = await Product.create(req.body)

  res.status(200).json({
    message: 'Product created',
    product,
  })
}

//Update product details  => /api/v1/admin/products/:id
export const updateProduct = async (req, res) =>{
  let product = await Product.findById(req.params.id)

  if(!product) {
    return res.status(404).json({
      error: "Product not found"
    })
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })

  res.status(200).json({
    product
  })
}