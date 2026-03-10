import axios from 'axios';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const testDelete = async () => {
    try {
        // Create an admin token
        const token = jwt.sign(process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD, process.env.JWT_SECRET);

        // Fetch products
        const listRes = await axios.get('http://localhost:4000/api/product/list');
        const products = listRes.data.products;

        if (products.length === 0) {
            console.log("No products to delete.");
            return;
        }

        const idToDelete = products[0]._id;
        console.log("Attempting to delete product:", products[0].name, "with ID:", idToDelete);

        // Delete product
        const deleteRes = await axios.post('http://localhost:4000/api/product/remove', { id: idToDelete }, {
            headers: { token }
        });

        console.log("Delete Response:", deleteRes.data);

        // Verify deletion
        const verifyRes = await axios.get('http://localhost:4000/api/product/list');
        const updatedProducts = verifyRes.data.products;

        const stillExists = updatedProducts.some(p => p._id === idToDelete);
        console.log("Product still exists in DB?", stillExists);

    } catch (err) {
        console.error("Error:", err.response ? err.response.data : err.message);
    }
};

testDelete();
