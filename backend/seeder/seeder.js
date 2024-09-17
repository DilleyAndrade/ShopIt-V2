import mongoose from 'mongoose'
import seederProductList from './data.js'
import Product from '../models/product.js'

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb+srv://dilleyandrade:Slifer1014@cluster0.sdj1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    
    await Product.deleteMany()
    console.log("Products are deleted")

    await Product.insertMany(seederProductList)
    console.log("Products are added")

    process.exit()
  }
  catch {
    console.log(error.message)
    process.exit()
  }
}

seedProducts()