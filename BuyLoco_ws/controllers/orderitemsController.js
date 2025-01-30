
const orderitems = require('../models').orderitems_model;
const orders = require('../models').orders_model;
const products = require('../models').products_model;


module.exports = {
    list(req, res) {
        return orderitems
            .findAll({})
            .then((orderitems) => res.status(200).send(orderitems))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return orderitems
            .findByPk(req.params.id)
            .then((orderitems) => {
                console.log(orderitems);
                if (!orderitems) {
                    return res.status(404).send({
                        message: 'orderitems Not Found',
                    });
                }
                return res.status(200).send(orderitems);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return orderitems
            .create({
                order_id: req.body.order_id,
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                price: req.body.price,

            })
            .then((orderitems) => res.status(201).send(orderitems))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return orderitems
            .findByPk(req.params.id)
            .then(orderitems => {
                if (!orderitems) {
                    return res.status(404).send({
                        message: 'orderitems Not Found',
                    });
                }
                return orderitems
                    .update({
                        order_id: req.body.order_id || orderitems.order_id,
                        product_id: req.body.product_id || orderitems.product_id,
                        quantity: req.body.quantity || orderitems.quantity,
                        prece: req.body.prece || orderitems.prece,
                    })
                    .then(() => res.status(200).send(orderitems))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return orderitems
            .findByPk(req.params.id)
            .then(orderitems => {
                if (!orderitems) {
                    return res.status(400).send({
                        message: 'orderitems Not Found',
                    });
                }
                return orderitems
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },


    listFull(req, res) {
        return orderitems
            .findAll({
                include: [{
                    model: orders
                },
                {
                    model: products
                }]
            })
            .then((orderitems) => res.status(200).send(orderitems))
            .catch((error) => { res.status(400).send(error); });
    },

};