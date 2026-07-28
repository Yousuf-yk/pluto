import axios from "axios";

const API = "http://localhost:3000/api/cart";

export const addToCart = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        API,
        { productId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getCart = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const updateCart = async (id, quantity) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API}/${id}`,
        { quantity },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const removeCart = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};