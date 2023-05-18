const express = require("express");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const dbConnect = require("./src/service/db");
const errorMiddleware = require("./src/middleware/error");
const cors = require("cors");
const {userRouter}=require("./src/routes")
const connectApp = async () => {
	const app = express();
	app.use(express.json());
	//adding CORS
	const allowedOrigins = ["http://localhost:3000"];
	app.use(
		cors({
			origin: function (origin, callback) {
				if (!origin) return callback(null, true);
				// allow whitelisted origins
				if (allowedOrigins.indexOf(origin) === -1)
					return callback(
						new Error(
							"The CORS policy for this site does not allow access from the specified Origin."
						),
						false
					);
				// else
				return callback(null, true);
			},
			credentials: true,
		})
	);
	//Routes
	app.use("/user", userRouter)

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

		server.close(() => {
			process.exit(1);
		});
	};
};

connectApp();