## How to set up
1. Install all the library dependecies by typing in `npm i`.
2. Make sure to adjust the connection string under the `model` on the `/database.js` file (Express/model/database.js).
    - The default connection string will be written as "postgres://postgres:root@127.0.0.1:5432/widatech"
    - Please adjust the connection string according to the specification of your local desktop.
    - The format of the connection string will be as follow "postgres://<username>:<password>@<host>:<port>/<database_name>". 
3. Open up terminal. To run the application type in `node index.js` while you're under the `Express` folder.
    - To run the application with developer mode type in `npm run start:dev`.
    - The tables of the database should automatically be generated into your database.
4. Application should be ready to be tested with Postman.

## Postman Documentation
My apologies. It seems that I am unable to convert the postman collection into markdown. This is caused by this following error.

![alt text](image.png)

But I did manage to publish my documentation and put it in this [link](https://documenter.getpostman.com/view/7802464/2sAYQakqcW).