const orders = require('../models').orders_model;
const users = require('../models').users_model;
const orderitems = require('../models').orderitems_model;

module.exports = {
    list(req, res) {
        return orders
            .findAll({})
            .then((orders) => res.status(200).send(orders))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return orders
            .findByPk(req.params.id)
            .then((orders) => {
                console.log(orders);
                if (!orders) {
                    return res.status(404).send({
                        message: 'orders Not Found',
                    });
                }
                return res.status(200).send(orders);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add(req, res) {
        return products
            .create({
                user_id: req.body.user_id,
                total: req.body.total,
                status: req.body.status,

            })
            .then((products) => res.status(201).send(products))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return orders
            .findByPk(req.params.id)
            .then(orders => {
                if (!orders) {
                    return res.status(404).send({
                        message: 'orders Not Found',
                    });
                }
                return orders
                    .update({
                        user_id: req.body.user_id || orders.user_id,
                        total: req.body.total || orders.total,
                        status: req.body.status || orders.status,
                    })
                    .then(() => res.status(200).send(orders))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return orders
            .findByPk(req.params.id)
            .then(orders => {
                if (!orders) {
                    return res.status(400).send({
                        message: 'orders Not Found',
                    });
                }
                return orders
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },


    listFull(req, res) {
        return orders
            .findAll({
                include: [{
                    model: users
                },
                {
                    model: orderitems
                }]
            })
            .then((orders) => res.status(200).send(orders))
            .catch((error) => { res.status(400).send(error); });
    },




};