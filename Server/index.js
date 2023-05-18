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
	app.use("/user", userRoute)

	//middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(errorMiddleware);
	//database connection
	try {
		await dbConnect.dbConnect();
		console.log("Database Connected");
	} catch (error) {
		console.log(error);
	}
	//? Handling Uncaught Exceptions
	process.on("uncaughtException", (err) => {
		console.log(`Error: ${err.message}`);
		console.log(`Shutting down the server due to Uncaught Exception`);
	app.use("/user", userRouter)


		process.exit(1);
	});
	//server connection
	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
	//? Unhandled Promise Rejection
	process.on("unhandledRejection", (err) => {
		console.log(`Error: ${err.message}`);
		console.log(`Shutting down the server due to Unhandled Promise Rejection`);

		server.close(() => {
			process.exit(1);
		});
	});
};

connectApp();