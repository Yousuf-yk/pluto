import axios from "axios";

const API = "http://localhost:3000/api/wishlist";

export const addWishlist = async (productId) => {

    const token = localStorage.getItem("token");

    const res = await axios.post(
        API,
        { productId },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return res.data;
};

export const getWishlist = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(API, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};

export const removeWishlist = async (id) => {

    const token = localStorage.getItem("token");

    const res = await axios.delete(`${API}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
};