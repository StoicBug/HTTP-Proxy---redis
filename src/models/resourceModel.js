import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    body: String,
    id: Number,
    title: String,
    userId: Number
});

const products = mongoose.model("products", productsSchema);

export {products};