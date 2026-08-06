import axios from "axios";

const API = "http://localhost:3000/api/products";


export const getProducts = async () => {
    const response = await axios.get(API);
    return response.data;
};


export const searchProducts = async (query) => {

    const res = await axios.get(
        `http://localhost:3000/api/products/search?q=${query}`
    );

    return res.data;

};