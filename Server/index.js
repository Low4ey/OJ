const express = require("express");
const config = require("./src/config/config");
const bodyParser = require("body-parser");


const connectApp=()=>{
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.json());

    app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
    });

}

connectApp();