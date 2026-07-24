import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import Footer from "../components/footer";
import Card from "../components/card";

import { getProducts } from "../services/productApi";

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    },
    []);

    return (
        <>
            <Navbar />
            <Hero />
            <section className="max-w-7xl mx-auto py-20 px-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <Card key={product.id} product={product}/>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Home;