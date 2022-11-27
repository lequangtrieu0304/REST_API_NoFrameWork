process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');
const { test } = require('mocha');
const server = require('../../server');
const should = chai.should();
const products = require('../data/products.json');

chai.use(chaiHttp);

describe('Products', () => {

    let id = 'bd07e256-81d6-4090-bdaf-3a0b9deac3aa'
    let testName = 'trieu'
    let updateProduct = {
        name: 'trieu123',
        description: 'B+',
        price: '60'
    }
    let product = {
        name: 'trieu123',
        description: 'A+',
        price: '50'
    }

    /*
    * Test for /GET
    */

    describe('/GET products', () => {
        it('GET all the products', done => {

            chai.request(server)
                .get('/api/products')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(products.length)
                    done();
                })
        })
    })

    /*
    * Test for /GET/:id
    */

    describe('/GET/:id product', () => {
        it('GET product by id', done => {
            chai.request(server)
                .get(`/api/products/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('name').eql(testName)
                    res.body.should.have.property('description')
                    res.body.should.have.property('price')
                    done();
                })
        })
    })

    /*
    *Test for /POST
    */

    describe('/POST product', () => {
        it('POST product', done => {
            chai.request(server)
                .post('/api/products')
                .send(product)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('name')
                    res.body.should.have.property('description')
                    res.body.should.have.property('price')
                    done();
                })
        })
    })
    
    /*
    * Test for /PUT
    */
    
    describe('/PUT/:id', () => {
        it('PUT product', done => {
            chai.request(server)
                .put(`/api/products/${id}`)
                .send(updateProduct)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id').eql(id)
                    res.body.should.have.property('description').eql(updateProduct.description)
                    res.body.should.have.property('name').eql(updateProduct.name)
                    res.body.should.have.property('price').eql(updateProduct.price)
                    done();
                })
        })
    })

    /*
    * Test for DELETE
    */

    describe('/DELETE/:id', () => {
        it('DELETE product by id', done => {
            chai.request(server)
                .delete(`/api/products/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eql(`Product ${id} removed`)
                    done();
                })
        })
    })
})