import { ShoppingCart, Heart, Eye } from "lucide-react";
import { addToCart } from "../services/cartApi";
import { addWishlist } from "../services/wishlistApi";




function Card({ product }) {

    const {
        id,
        name,
        price,
        description,
        image_url,
        category
    } = product;

    const handleAddToCart = async () => {
        try {

            const res = await addToCart(id);

            alert(res.message);

        } catch (err) {

            alert(err.response?.data?.message || err.message);

        }
    };

    const handleWishlist = async () => {

        try {

            const res = await addWishlist(id);

            alert(res.message);

        } catch (err) {

            alert(err.response?.data?.message || err.message);

        }

    };

    return (

        <div className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">

            {/* Image */}

            <div className="relative h-72 overflow-hidden">

                <img
                    src={`http://localhost:3000/uploads/${image_url}`}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 duration-500"
                />

                {/* Category */}

                <span className="absolute top-4 left-4 bg-rose-400 text-white text-xs px-3 py-1 rounded-full font-semibold">

                    {category}

                </span>

                {/* Wishlist */}

                <button
                    onClick={handleWishlist}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow hover:bg-red-50"
                >
                    <Heart
                        size={18}
                        className="text-gray-600 hover:text-red-500"
                    />
                </button>

            </div>

            {/* Details */}

            <div className="p-6 flex flex-col h-[250px]">

                <h2 className="text-2xl font-bold text-gray-900 line-clamp-1">

                    {name}

                </h2>

                <p className="text-gray-500 mt-3 line-clamp-3 flex-grow">

                    {description}

                </p>

                <div className="flex justify-between items-center mt-6">

                    <h2 className="text-3xl font-bold text-rose-500">

                        ₹{price}

                    </h2>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                    <button
                        className="flex justify-center items-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition"
                    >

                        <Eye size={18} />

                        Details

                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition duration-300"
                    >

                        <ShoppingCart size={18} />

                        Add

                    </button>

                </div>

            </div>

        </div>

    );

}

export default Card;