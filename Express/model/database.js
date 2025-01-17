import { Sequelize } from "sequelize";
import { Model, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:root@127.0.0.1:5432/widatech', {});

class Invoice extends Model {};
class Product extends Model {};

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        invoiceNo: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        },
        date: {
            allowNull: false,
            type: DataTypes.STRING
        },
        customerName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                min: 2
            }
        },
        salespersonName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                min: 2
            }
        },
        paymentType: {
            allowNull: false,
            type: DataTypes.ENUM('CASH', 'CREDIT')
        },
        notes: {
            allowNull: true,
            type: DataTypes.TEXT
        }
    },
    {
        sequelize,
        modelName: 'Invoice',
        timestamps: false
    }
)

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true,
        },
        invoiceId: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        itemName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                min: 5
            }
        },
        quantity: {
            allowNull: false,
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        },
        costOfGoodsSold: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        priceSold: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'Product'
    }
);

Invoice.hasMany(Product, { foreignKey: 'invoiceId' });
Product.belongsTo(Invoice);

export default {
    sequelize,
    Invoice,
    Product
}