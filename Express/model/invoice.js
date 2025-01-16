import { Model, DataTypes } from 'sequelize';
import { Product } from './product';

class Invoice extends Model {}

Invoice.init(
    'Invoice',
    {
        invoiceNo: {
            allowNull: false,
            type: DataTypes.NUMBER,
            validate: {
                min: 1
            }
        },
        date: {
            allowNull: false,
            type: DataTypes.DATE
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
    }
)

Invoice.hasOne(Product, { foreignKey: 'invoiceId' });

export default {
    Invoice
}