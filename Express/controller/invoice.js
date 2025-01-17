import { Op } from 'sequelize';
import model from '../model/index.js';

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
            if (invoice.length < 0) return { message: 'Invoice data is empty', data: inv }
            return { message: 'Success', data: { invoice, page, size } }
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

    async deleteInvoice(id) {
        return Invoice.destroy({ where: { id: id } })
        .then((inv) => {
            if (inv[0] == 0) return { message: 'No data was deleted' };
            return { message: 'Success' };
        })
        .catch((err) => {
            return { message: 'An error has occurred', err: err.message }
        });
    }
}

export default {
    InvoiceController
}