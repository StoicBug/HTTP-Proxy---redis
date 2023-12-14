import express  from "express";
import { products } from '../models/resourceModel.js';

const router = express.Router();

router.get("/posts", async (req, res) => {
    try {
        const allProducts = await products.find({});
        console.log('From Redis Cache');
        res.json(allProducts);
    }catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

export { router };