const Product = require('../models/productModel')

const { getPostData } = require('../../utils')

// @desc    Gets All Products
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    }
    catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Product
// @route   GET /api/product/:id
const getProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    }
    catch (error) {
        console.log(error)
    }
}

// @desc    Create a Product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const body = await getPostData(req)
        const { name, description, price } = JSON.parse(body)
        const product = {
            name,
            description,
            price
        }

        const newProduct = await Product.create(product)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newProduct))

    }
    catch (error) {
        console.log(error)
    }
}

// @desc    Update a Product
// @route   PUT /api/products/:id
const updateProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({
                message: 'Not Found product'
            }))
        }
        const body = await getPostData(req)
        const { name, description, price } = JSON.parse(body);
        const updateProduct = {
            name: name || product.name,
            description: description || product.description,
            price: price || product.price
        }
        const result = await Product.update(id, updateProduct);
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify(result))
    }
    catch (error) {
        console.log(error)
    }
}

// @desc    Delete Product
// @route   DELETE /api/product/:id
const deleteProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await Product.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } 
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}