import mongoose from "mongoose";

const connectDB = async (req, res, next) => {
	try {
		let conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Connected to mongodb at ${conn.connection.host}`);
	} catch (err) {
		console.log(`Error connecting to mongodb ${err.message}`);
		process.exit(1);
	}
};

export default connectDB;
