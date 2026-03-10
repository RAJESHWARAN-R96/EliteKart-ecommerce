import mongoose from "mongoose";
import 'dotenv/config'
import productModel from "./models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import path from "path";

// 1. Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected");

        console.log("Starting Cloudinary Uploads for all 15 products...");

        const assetDir = path.resolve('../frontend/src/assets');

        // Helper function to upload an image
        const uploadImage = async (filename) => {
            const result = await cloudinary.uploader.upload(path.join(assetDir, filename), { resource_type: "image" });
            return result.secure_url;
        };

        const productsData = [
            {
                name: "Soft uniform for children",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 100,
                imageFile: "child1.jpg",
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L"],
                date: 1716634354448,
                bestseller: true
            },
            {
                name: "Casual for children",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 150,
                imageFile: "child2.jpg",
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L"],
                date: 1716720754448,
                bestseller: true
            },
            {
                name: "Modern for children",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 120,
                imageFile: "child3.jpg",
                category: "Kids",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L"],
                date: 1716807154448,
                bestseller: true
            },
            {
                name: "Modern for children",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 170,
                imageFile: "child4.jpg",
                category: "Kids",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L"],
                date: 1716893554448,
                bestseller: true
            },
            {
                name: "Uniform children",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 100,
                imageFile: "child5.jpg",
                category: "Kids",
                subCategory: "Topwear",
                sizes: ["S", "M", "L"],
                date: 1716979954448,
                bestseller: true
            },
            {
                name: "Blue suit for men",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 250,
                imageFile: "men1.jpg",
                category: "Men",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717066354448,
                bestseller: true
            },
            {
                name: "Black suit for men",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 250,
                imageFile: "men2.jpg",
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717152754448,
                bestseller: true
            },
            {
                name: "Modern for men",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 300,
                imageFile: "men3.jpg",
                category: "Men",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717239154448,
                bestseller: true
            },
            {
                name: "Sweater for men",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 175,
                imageFile: "men4.jpg",
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L"],
                date: 1717325554448,
                bestseller: true
            },
            {
                name: "Suit for men",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 220,
                imageFile: "men5.jpg",
                category: "Men",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717411954448,
                bestseller: true
            },
            {
                name: "Casual for Women",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 70,
                imageFile: "women1.jpg",
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717498354448,
                bestseller: true
            },
            {
                name: "Modern dress for women",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 300,
                imageFile: "women2.jpg",
                category: "Women",
                subCategory: "Topwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717584754448,
                bestseller: true
            },
            {
                name: "Fashionable for women",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 400,
                imageFile: "women3.jpg",
                category: "Women",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717671154448,
                bestseller: true
            },
            {
                name: "Fashion coloured dress",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 400,
                imageFile: "women4.jpg",
                category: "Women",
                subCategory: "Bottomwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717757554448,
                bestseller: true
            },
            {
                name: "Casual for Women Winter",
                description: "standardized sets of clothing mandated by educational institutions for students to wear, promoting a unified, professional appearance",
                price: 100,
                imageFile: "women5.jpg",
                category: "Women",
                subCategory: "Winterwear",
                sizes: ["S", "M", "L", "XL"],
                date: 1717843954448,
                bestseller: true
            }
        ];

        let finalProducts = [];

        for (let i = 0; i < productsData.length; i++) {
            console.log(`Uploading ${productsData[i].imageFile} (${i + 1}/${productsData.length})...`);
            let url = await uploadImage(productsData[i].imageFile);
            let productObj = { ...productsData[i], image: [url] };
            delete productObj.imageFile; // Remove the temporary file path attribute
            finalProducts.push(productObj);
        }

        console.log("Uploads Complete! Seeding Database...");

        await productModel.deleteMany({});
        await productModel.insertMany(finalProducts);
        console.log("Products Seeded!");

        process.exit();

    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

connectDB();
