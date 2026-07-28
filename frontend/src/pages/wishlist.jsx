import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import {
    getWishlist,
    removeWishlist
} from "../services/wishlistApi";

import { addToCart } from "../services/cartApi";

const Wishlist = () => {

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {

        try {

            const data = await getWishlist();

            setWishlist(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchWishlist();

    }, []);

    const handleRemove = async (id) => {

        try {

            await removeWishlist(id);

            setWishlist((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (err) {

            console.log(err);

        }

    };

    const handleAddToCart = async (productId) => {

        try {

            const res = await addToCart(productId);

            alert(res.message);

        } catch (err) {

            alert(err.response?.data?.message || err.message);

        }

    };

    if (loading) {

        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    }

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 pt-28 pb-16">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="mb-10">

                        <h1 className="text-5xl font-black">
                            My Wishlist ❤️
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {wishlist.length} Saved Products
                        </p>

                    </div>

                    {wishlist.length === 0 ? (

                        <div className="bg-white rounded-3xl shadow-lg py-24 text-center">

                            <Heart
                                size={80}
                                className="mx-auto text-red-400 mb-6"
                            />

                            <h2 className="text-3xl font-bold">
                                Wishlist is Empty
                            </h2>

                            <p className="text-gray-500 mt-4 mb-8">
                                Save products by clicking the ❤️ button.
                            </p>

                            <Link
                                to="/"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    ) : (

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                            {wishlist.map((item) => (

                                <div
                                    key={item.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300"
                                >

                                    <div className="relative h-72 overflow-hidden">

                                        <img
                                            src={`http://localhost:3000/uploads/${item.image_url}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover hover:scale-110 transition duration-500"
                                        />

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-red-100"
                                        >
                                            <Trash2
                                                size={18}
                                                className="text-red-500"
                                            />
                                        </button>

                                    </div>

                                    <div className="p-6">

                                        <p className="text-sm text-indigo-600 font-semibold">
                                            {item.category}
                                        </p>

                                        <h2 className="text-2xl font-bold mt-2">
                                            {item.name}
                                        </h2>

                                        <p className="text-gray-500 mt-3 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="text-3xl font-black text-indigo-600 mt-5">
                                            ₹{item.price}
                                        </p>

                                        <button
                                            onClick={() =>
                                                handleAddToCart(item.product_id)
                                            }
                                            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                                        >
                                            <ShoppingCart size={18} />
                                            Add to Cart
                                        </button>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>

            <Footer />
        </>

    );

};

export default Wishlist;