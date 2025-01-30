const {
  DataTypes
} = require('sequelize');
module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "order_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "orders_model"
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "product_id",
      autoIncrement: false,
      references: {
        key: "id",
        model: "products_model"
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "quantity",
      autoIncrement: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "price",
      autoIncrement: false
    }
  };
  const options = {
    tableName: "orderitems",
    comment: "",
    indexes: [],
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    schema: 'public'
  };
  const OrderitemsModel = sequelize.define("orderitems_model", attributes, options);

  OrderitemsModel.associate = function (models) {

    OrderitemsModel.belongsTo(models.orders_model, {
      foreignKey: 'order_id'
    });

    OrderitemsModel.belongsTo(models.products_model, {
      foreignKey: 'product_id'
    });

  };


  return OrderitemsModel;
};