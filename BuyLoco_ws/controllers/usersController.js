const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


const users = require('../models').users_model;
const orders = require('../models').orders_model;
const reviews = require('../models').reviews_model;

module.exports = {

    list(req, res) {
        return users
            .findAll({})
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {

        console.log(req.params.id);
        return users
            .findByPk(req.params.id)
            .then((users) => {
                console.log(users);
                if (!users) {
                    return res.status(404).send({
                        message: 'users Not Found',
                    });
                }
                return res.status(200).send(users);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

    add: async (req, res) => {
        try {
            // Verificar si el usuario ya existe por el email o el nombre de usuario
            const existingUser = await users.findOne({
                where: {
                    [Op.or]: [
                        { email: req.body.email },
                        { name: req.body.name }
                    ]
                }
            });

            if (existingUser) {
                return res.status(400).send({ error: 'El nombre de usuario o el correo electrónico ya están registrados.' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            const newUser = await users.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role || 'consumer',
            });

            return res.status(201).send(newUser);

        } catch (error) {
            return res.status(500).send({ error: 'Hubo un error al procesar la solicitud.' });
        }
    },


    update(req, res) {
        return users
            .findByPk(req.params.id)
            .then(async user => {
                if (!user) {
                    return res.status(404).send({ message: 'User not found' });
                }

                const saltRounds = 10;
                let updatedData = {
                    name: req.body.name || user.name,
                    email: req.body.email || user.email,
                    role: req.body.role || user.role
                };

                // Solo actualizar la contraseña si se proporciona una nueva
                if (req.body.password) {
                    updatedData.password = await bcrypt.hash(req.body.password, saltRounds);
                }

                return user
                    .update(updatedData)
                    .then(() => res.status(200).send(user))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },


    delete(req, res) {
        return users
            .findByPk(req.params.id)
            .then(users => {
                if (!users) {
                    return res.status(400).send({
                        message: 'users Not Found',
                    });
                }
                return users
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return users
            .findAll({
                include: [{
                    model: orders
                },
                {
                    model: reviews
                }]
            })
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(400).send(error); });
    },


    login(req, res) {
        const { email, password } = req.body;

        // Buscar usuario por email o username
        users.findOne({
            where: {
                [Op.or]: [
                    { email: email },
                ]
            }
        })
            .then(user => {
                // Verificar si el usuario existe
                if (!user) {
                    return res.status(404).send({ message: 'Usuario no encontrado' });
                }

                // Verificar la contraseña
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(401).send({ message: 'Contraseña incorrecta' });
                        }

                        // Devolver información del usuario (sin la contraseña)
                        const { password: _, ...userData } = user.dataValues; // Excluir la contraseña
                        return res.status(200).send(userData); // O devuelve solo lo que necesites
                    });
            })
            .catch(error => {
                console.error('Error en el inicio de sesión:', error);
                return res.status(500).send({ message: 'Error del servidor' });
            });
    },




};