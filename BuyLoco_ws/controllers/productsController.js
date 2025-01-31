const products = require('../models').products_model;
const categories = require('../models').categories_model;
const orderitems = require('../models').orderitems_model;
const reviews = require('../models').reviews_model;


module.exports = {
    list(req, res) {
        return products
            .findAll({})
            .then((products) => res.status(200).send(products))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return products
            .findByPk(req.params.id)
            .then((products) => {
                console.log(products);
                if (!products) {
                    return res.status(404).send({
                        message: 'products Not Found',
                    });
                }
                return res.status(200).send(products);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return products
            .create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
                category_id: req.body.category_id,
                image_url: req.file ? `/uploads/${req.file.filename}` : null, // Guarda la imagen si existe
            })
            .then((product) => res.status(201).send(product))
            .catch((error) => res.status(400).send(error));
    },


    update(req, res) {
        return products
            .findByPk(req.params.id)
            .then(products => {
                if (!products) {
                    return res.status(404).send({
                        message: 'products Not Found',
                    });
                }
                return products
                    .update({
                        name: req.body.name || products.name,
                        description: req.body.description || products.description,
                        price: req.body.price || products.price,
                        stock: req.body.stock || products.stock,
                        category_id: req.body.category_id || products.category_id,
                        image_url: req.body.image_url || products.image_url,
                    })
                    .then(() => res.status(200).send(products))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },


    delete(req, res) {
        return products
            .findByPk(req.params.id)
            .then(products => {
                if (!products) {
                    return res.status(400).send({
                        message: 'products Not Found',
                    });
                }
                return products
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return products
            .findAll({
                include: [{
                    model: categories
                },
                {
                    model: orderitems
                },
                {
                    model: reviews
                }
                ]
            })
            .then((products) => res.status(200).send(products))
            .catch((error) => { res.status(400).send(error); });
    },






};