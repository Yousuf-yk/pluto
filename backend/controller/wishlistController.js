import {
    addWishlistModel,
    getWishlistModel,
    removeWishlistModel,
    checkWishlistModel
} from "../models/wishlistModel.js";

// Add product to wishlist
export const addWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const { productId } = req.body;

        const alreadyExists = await checkWishlistModel(userId, productId);

        if (alreadyExists) {
            return res.status(400).json({
                message: "Product already in wishlist."
            });
        }

        const wishlist = await addWishlistModel(userId, productId);

        res.status(201).json({
            message: "Product added to wishlist.",
            wishlist
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Get wishlist
export const getWishlist = async (req, res) => {

    try {

        const userId = req.user.id;

        const wishlist = await getWishlistModel(userId);

        res.json(wishlist);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Remove wishlist item
export const removeWishlist = async (req, res) => {

    try {

        const userId = req.user.id;
        const wishlistId = req.params.id;

        const deleted = await removeWishlistModel(wishlistId, userId);

        if (!deleted) {

            return res.status(404).json({
                message: "Wishlist item not found."
            });

        }

        res.json({
            message: "Product removed from wishlist."
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};