import mongoose from 'mongoose';

const user = "";
const password = "";
const dbname = "";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${user}:${password}@myatlasclusteredu.9b62cqh.mongodb.net/${dbname}`);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export {connectToDatabase};