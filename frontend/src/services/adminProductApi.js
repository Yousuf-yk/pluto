import axios from "axios";

const API = "http://localhost:3000/api/products";


// ================================
// UPDATE PRODUCT
// ================================

export const updateProduct = async (id, productData) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.put(
            `${API}/${id}`,
            productData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    } catch (error) {

        throw error.response?.data || error;

    }

};


// ================================
// DELETE PRODUCT
// ================================

export const deleteProduct = async (id) => {

    try {

        const token = localStorage.getItem("token");

        const response = await axios.delete(
            `${API}/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;

    } catch (error) {

        throw error.response?.data || error;

    }

};