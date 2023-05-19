const express = require("express");
const config = require("./src/config/config");
const bodyParser = require("body-parser");
const { dbConnect, corsConnect } = require("./src/service");
const errorMiddleware = require("./src/middleware/error");
const { userRouter } = require("./src/routes")
const { handleUnhandledRejection, handleUncaughtException } = require("./src/utils")
const connectApp = async () => {
	const app = express();
	app.use(express.json());
	//middleware
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(errorMiddleware);
	//adding CORS
	app.use(corsConnect.corsConnect())
	//Routes
	app.use("/user", userRouter)

	//database connection
	try {
		await dbConnect;
		console.log("Database Connected");
	} catch (error) {
		console.log(error);
	}
	//server connection
	app.listen(config.PORT, () => {
		console.log(`Server running on port ${config.PORT}`);
	});
	// Error Handlers
	process.on("uncaughtException", (err) => {
		handleUncaughtException(err);
	});
	process.on("unhandledRejection", (err) => {
		handleUnhandledRejection(err);
	});
};

connectApp();