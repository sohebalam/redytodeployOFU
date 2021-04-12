import express from "express"
import mongoose from "mongoose"

import Product from "../models/ProductModel.js"

const router = express.Router()

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const product = await Product.findById(id)

    res.status(200).json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  const product = req.body

  const newProduct = new Product({
    ...product,
  })

  try {
    await newProduct.save()

    res.status(201).json(newProduct)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const { title, description, price, selectedFile, tags } = req.body

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Product with id: ${id}`)

  const updatedProduct = {
    title,
    description,
    price,
    tags,
    selectedFile,
    _id: id,
  }

  await Product.findByIdAndUpdate(id, updatedProduct, { new: true })

  res.json(updatedProduct)
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Product with id: ${id}`)

  await Product.findByIdAndRemove(id)

  res.json({ message: "Product deleted successfully." })
}

export const likeProduct = async (req, res) => {
  const { id } = req.params

  if (!req.user._id) {
    return res.json({ message: "Unauthenticated" })
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No Product with id: ${id}`)

  const product = await Product.findById(id)

  const index = product.likes.findIndex((id) => id === String(req.user._id))

  if (index === -1) {
    product.likes.push(req.user._id)
  } else {
    product.likes = product.likes.filter((id) => id !== String(req.user._id))
  }
  const updatedProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  })
  res.status(200).json(updatedProduct)
}
