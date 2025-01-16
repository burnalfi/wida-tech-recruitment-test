import { Model, DataTypes } from 'sequelize';
import { Invoice } from './invoice';

class Product extends Model {}

Product.init(
    'Product',
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
            type: DataTypes.NUMBER,
            validate: {
                min: 1
            }
        },
        quantitySold: {
            allowNull: false,
            type: DataTypes.NUMBER,
            defaultValue: 0
        },
        totalSold: {
            allowNull: false,
            type: DataTypes.NUMBER,
            defaultValue: 0
        }
    }
);

Product.belongsTo(Invoice)

export default {
    Product
}