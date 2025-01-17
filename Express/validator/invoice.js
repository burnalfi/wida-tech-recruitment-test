import { body, checkSchema, validationResult } from 'express-validator';

const errorHandler = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() })
    }
    next();
}

const createInvoiceValidation = [
    checkSchema(
        {
            invoiceNo: { notEmpty: true, isInt: true, isLength: { min: 1 } },
            date: { notEmpty: true, isISO8601: true },
            customerName: { notEmpty: true, isString: true, isLength: { min: 2 } },
            salespersonName: { notEmpty: true, isString: true, isLength: { min: 2 } },
            paymentType: { notEmpty: true, isIn: { options: [['CASH', 'CREDIT']] } },
            notes: { notEmpty: false }
        }
    ),
    errorHandler
];


const updateInvoiceValidation = [
    checkSchema(
        {
            invoiceNo: { notEmpty: false, isInt: true, isLength: { min: 1 } },
            date: { notEmpty: false, isISO8601: true },
            customerName: { notEmpty: false, isString: true, isLength: { min: 2 } },
            salespersonName: { notEmpty: false, isString: true, isLength: { min: 2 } },
            paymentType: { notEmpty: false, isIn: { options: [['CASH', 'CREDIT']] } },
            notes: { isString: true }
        }
    ),
    errorHandler
];


export default {
    createInvoiceValidation,
    updateInvoiceValidation,
    errorHandler
}