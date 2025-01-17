import { Router } from "express";
import controller from '../controller/index.js';
import validator from "../validator/index.js";

const { invoice: { InvoiceController } } = controller;
const { invoice: { createInvoiceValidation } } = validator;

const invoiceRouter = Router({});
const invoiceController = new InvoiceController();

invoiceRouter.get('', async (req, res) => {
    return res.json(await invoiceController.getInvoices(req.query));
});

invoiceRouter.post('', createInvoiceValidation, async (req, res) => {
    return res.json(await invoiceController.createInvoice(req.body));
});

invoiceRouter.patch('', async (req, res) => {
    return res.json(await invoiceController.updateInvoice(req.query, req.body));
});

invoiceRouter.delete('', async (req, res) => {
    return res.json(await invoiceController.deleteInvoice(req.query));
});

export default {
    invoiceRouter
}