const orderitems = require('../models').orderitems_model;
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

};