import {
    getCartItems,
    findCartItem,
    addCartItem,
    increaseQuantity,
    updateQuantity,
    removeCartItem
} from "../models/cartModel.js";

// GET CART
export const getCart = async (req, res) => {
    try {

        const userId = req.user.id;

        const cart = await getCartItems(userId);

        res.status(200).json(cart);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// ADD TO CART
export const addToCart = async (req, res) => {
    try {

        const userId = req.user.id;
        const { productId } = req.body;

        const existingItem = await findCartItem(userId, productId);

        if (existingItem) {

            const updatedItem = await increaseQuantity(existingItem.id);

            return res.status(200).json({
                message: "Quantity updated",
                cart: updatedItem
            });

        }

        const newItem = await addCartItem(userId, productId);

        res.status(201).json({
            message: "Product added to cart",
            cart: newItem
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// UPDATE QUANTITY
export const updateCartQuantity = async (req, res) => {
    try {

        const { id } = req.params;
        const { quantity } = req.body;

        const updatedItem = await updateQuantity(id, quantity);

        res.status(200).json({
            message: "Cart updated",
            cart: updatedItem
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// REMOVE ITEM
export const deleteCartItem = async (req, res) => {
    try {

        const { id } = req.params;

        await removeCartItem(id);

        res.status(200).json({
            message: "Item removed from cart"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};