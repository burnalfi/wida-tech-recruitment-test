import express from 'express';
import database from './model/database.js';
const app = express();


function main() {
    database.sequelize.sync();
    
    app.get('/', (_, res) => {
        res.send('Hello World!');
    });

    app.listen(3000, () => {
        console.log(`Example app listening on port 3000`)
    });
};

main();