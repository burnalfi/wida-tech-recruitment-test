import { Op } from 'sequelize';
import model from '../model/index.js';
import lodash from 'lodash';

const { database: { Product, Invoice } } = model;

class InvoiceController {
    async getInvoices(query) {
        const { startDate, endDate, size, page } = query;
        
        let options = {
            where: {},
            limit: 10,
            offset: (1 - 1) * 10,
            include: Product
        };

        if (startDate && endDate) options.where['date'] = { [Op.between]: [startDate, endDate] };
        
        if (page && size) {
            options.limit = size;
            options.size = (page - 1) * size
        }

        return Invoice.findAll(options)
        .then((invoice) => {
            if (invoice.length < 0) return { message: 'Invoice data is empty', data: inv };
            invoice.forEach(i => {
                i.invoiceProfit = lodash.sum(i.Products.map(p => p.priceSold)) - lodash.sum(i.Products.map(p => p.costOfGoodsSold))
            })
            return { message: 'Success', data: { totalProfit: lodash.sum(invoice.map(i => i.invoiceProfit)), totalCashTransaction: invoice.length, invoice, page: page ?? 1, size: size ?? 10 } };
        })
        .catch((err) => {
            return { message: 'An error has occurred', err: err.message }
        });
    }

    async createInvoice(payload) {
        return Invoice.create(payload)
        .then((inv) => {
            return { message: 'Success', data: inv }
        })
        .catch((err) => {
            return { message: 'An error has occurred', err: err.message }
        });
    }

    async updateInvoice(query, payload) {
        return Invoice.update(payload, { where: { ...query } })
        .then((inv) => {
            if (inv[0] == 0) return { message: 'No data was updated' };
            return { message: 'Success'};
        })
        .catch((err) => {
            return { message: 'An error has occurred', err: err.message }
        });
    }

    async deleteInvoice(query) {
        const { id } = query;
        
        if (!id) return { message: 'Query id must be provided' };

        return Invoice.destroy({ where: { id } })
        .then((inv) => {
            if (inv == 0) return { message: 'No data was deleted' };
            return { message: 'Success' };
        })
        .catch((err) => {
            return { message: 'An error has occurred', err: err.message }
        });
    }
    async createProduct(payload) {
        return Product.create(payload);
    }
}

export default {
    InvoiceController
}