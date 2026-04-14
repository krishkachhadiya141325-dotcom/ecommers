const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables. Please set it in backend/.env');
    }

    if (mongoURI.startsWith('mongodb+srv://')) {
      // Ensure SRV DNS resolution uses a public resolver if local DNS is blocking SRV lookups.
      dns.setServers(['1.1.1.1', '8.8.8.8']);
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
