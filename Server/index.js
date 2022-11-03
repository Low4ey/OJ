const express = require("express");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const  dbConnect= require("./src/service/db");


const connectApp=async ()=>{
    try {
        await dbConnect.dbConnect();
        console.log('Database Connected');
    } catch (error) {
        console.log(error);
    }
    
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.json());

    app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    });

}

connectApp();