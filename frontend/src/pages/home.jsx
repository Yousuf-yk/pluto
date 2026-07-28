import { useEffect, useState } from "react";

import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Card from "../components/card";

import { getProducts } from "../services/productApi";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const data = await getProducts();

                setProducts(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <Navbar />

            <Hero />
            <section className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold mb-2">Free Shipping</h2>
                        <p className="text-gray-500">
                            Free delivery on all orders above ₹999.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold mb-2"> Secure Payment</h2>
                        <p className="text-gray-500">
                            100% safe and encrypted checkout.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition">
                        <h2 className="text-2xl font-bold mb-2">Premium Quality</h2>
                        <p className="text-gray-500">
                            Carefully selected products at the best prices.
                        </p>
                    </div>

                </div>

            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">

                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">
                            Featured Products
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Discover our latest collection.
                        </p>
                    </div>

                    <div className="mt-4 md:mt-0">
                        <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
                            {products.length} Products
                        </span>
                    </div>

                </div>

                {loading ? (

                    <div className="flex justify-center items-center h-60">

                        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>

                    </div>

                ) : products.length === 0 ? (

                    <div className="text-center py-24">

                        <h2 className="text-3xl font-bold">
                            No Products Found
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Please check back later.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                        {products.map((product) => (

                            <Card
                                key={product.id}
                                product={product}
                            />

                        ))}

                    </div>

                )}

            </section>

            <Footer />

        </div>
    );
};

export default Home;