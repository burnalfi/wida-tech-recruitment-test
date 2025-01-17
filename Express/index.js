import express from 'express';
import database from './model/database.js';
import routes from './routes/index.js';

const app = express();
const { invoice: { invoiceRouter } } = routes;

function main() {
    database.sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch((err) => {
      console.error("Error creating database and tables:", err);
    });

    app.use(express.json());
    
    app.get('/', (_, res) => {
        res.send('Hello World!');
    });

    app.use('/invoice', invoiceRouter);

    app.listen(3000, () => {
        console.log(`Example app listening on port 3000`)
    });
};

main();