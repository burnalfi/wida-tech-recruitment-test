import model from '../model/index.js';
import xlsx from 'node-xlsx';
import fs from 'fs';
import lodash from 'lodash';
const { database: { Product, Invoice } } = model;

class ProductController {
    async uploadProducts(file) {
        const sheet = xlsx.parse(fs.readFileSync(`uploads/${file.filename}`), { cellDates: true });

        const invoiceSheet = sheet[0].data;
        const productSheet = sheet[1].data;

        const invoicePayload = lodash.compact(
            invoiceSheet.map((is, i) => {
                if (i == 0) return; 
                return {
                    invoiceNo: is[0],
                    date: new Date(new Date(is[1]).getTime() + (60 * 60 * 8 * 1000)),
                    customerName: is[2],
                    salespersonName: is[3],
                    paymentType: is[4],
                    notes: is[5]
                }
            })
        );

        const productPayload = lodash.compact(
            productSheet.map((ps, i) => {
                if (i == 0) return; 
                return {
                    invoiceNo: ps[0],
                    itemName: ps[1],
                    quantity: ps[2],
                    costOfGoodsSold: ps[3],
                    priceSold: ps[4]
                }
            })
        )

        const invoiceNos = invoicePayload.map(i => i.invoiceNo);
        if (lodash.uniq(invoiceNos).length !== invoiceNos.length) return { message: "invoice no can't be duplicate" };

        for (let inv of invoicePayload) {
            if (!inv.invoiceNo || typeof(inv.invoiceNo) != 'number') return { message: 'invoice no column must be filled with a number' };
            if (!inv.salespersonName || typeof(inv.salespersonName) != 'string') return { message: 'salesperson column must be filled with a string' };
            if (!inv.paymentType || (inv.paymentType === 'CASH' && inv.paymentType === 'CREDIT')) return { message: 'payment type must be filled with either "CASH" or "CREDIT"' };
        }

        for (let prod of productPayload) {
            if (!prod.invoiceNo || typeof(prod.invoiceNo) != 'number') return { message: 'invoice no column must be filled with a number' };
            if (!invoiceNos.includes(prod.invoiceNo)) return { message: `invoice no ${prod.invoiceNo} is not available` };
            if (!prod.costOfGoodsSold || typeof(prod.costOfGoodsSold) !== 'number') return { message: 'total cogs column must be filled with a number' };
            if (!prod.priceSold || typeof(prod.priceSold) !== 'number') return { message: 'total price column must be filled with a number' };
        }
        
        const invoices = await Invoice.bulkCreate(invoicePayload);
        const products = await Product.bulkCreate(productPayload);

        return { invoices, products };
    }
}

export default { 
    ProductController
}
