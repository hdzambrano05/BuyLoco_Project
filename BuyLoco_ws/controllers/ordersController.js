const orders = require('../models').orders_model;
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

};