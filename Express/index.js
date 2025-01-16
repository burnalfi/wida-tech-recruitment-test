import express from 'express';
import database from './model/database.js';
import controller from './controller/index.js';
const app = express();


function main() {
    database.sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => {
      console.error("Error creating database and tables:", err);
    });;
    
    app.get('/', (_, res) => {
        res.json(controller.product.ProductController.getProduct());
    });

    app.listen(3000, () => {
        console.log(`Example app listening on port 3000`)
    });
};

main();