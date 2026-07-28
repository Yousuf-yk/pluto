import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getCart, updateCart, removeCart } from "../services/cartApi";

const Cart = () => {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] =useState(true);

    const fetchCart = async () => {

        try {

            const data = await getCart();

            setCart(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    const increase = async (item) => {

        await updateCart(item.id, item.quantity + 1);

        fetchCart();

    };

    const decrease = async (item) => {

        if(item.quantity===1) return;

        await updateCart(item.id,item.quantity-1);

        fetchCart();

    };

    const removeItem = async(id)=>{

        await removeCart(id);

        fetchCart();

    };

    const total = cart.reduce(
        (sum,item)=>sum+item.price*item.quantity,
        0
    );

    if(loading){

        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    }

    return (

        <>
        <Navbar/>

        <div className="bg-gray-100 min-h-screen py-10">

            <div className="max-w-7xl mx-auto px-5">

                <h1 className="text-4xl font-bold mb-10">
                    Shopping Cart
                </h1>

                {
                    cart.length===0?

                    <div className="bg-white rounded-2xl shadow-lg p-14 text-center">

                        <ShoppingBag
                            size={80}
                            className="mx-auto text-indigo-500 mb-6"
                        />

                        <h2 className="text-3xl font-bold mb-3">
                            Your Cart is Empty
                        </h2>

                        <p className="text-gray-500 mb-8">
                            Looks like you haven't added anything yet.
                        </p>

                        <Link
                            to="/"
                            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                    :

                    <div className="grid lg:grid-cols-3 gap-10">

                        <div className="lg:col-span-2 space-y-6">

                            {

                                cart.map((item)=>(

                                    <div
                                        key={item.id}
                                        className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-6 items-center"
                                    >

                                        <img
                                            src={`http://localhost:3000/uploads/${item.image_url}`}
                                            alt={item.name}
                                            className="w-40 h-40 rounded-xl object-cover"
                                        />

                                        <div className="flex-1">

                                            <h2 className="text-2xl font-bold">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                ₹{item.price}
                                            </p>

                                            <div className="flex items-center gap-3 mt-6">

                                                <button
                                                    onClick={()=>decrease(item)}
                                                    className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
                                                >
                                                    <Minus size={18}/>
                                                </button>

                                                <span className="text-xl font-bold w-8 text-center">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={()=>increase(item)}
                                                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700"
                                                >
                                                    <Plus size={18}/>
                                                </button>

                                            </div>

                                        </div>

                                        <div className="text-center">

                                            <h2 className="text-2xl font-bold text-indigo-600 mb-5">
                                                ₹{item.price*item.quantity}
                                            </h2>

                                            <button
                                                onClick={()=>removeItem(item.id)}
                                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                            >
                                                <Trash2 size={18}/>
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-24">

                            <h2 className="text-3xl font-bold mb-8">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mb-4">

                                <span>Items</span>

                                <span>{cart.length}</span>

                            </div>

                            <div className="flex justify-between mb-4">

                                <span>Shipping</span>

                                <span className="text-green-600">
                                    Free
                                </span>

                            </div>

                            <hr className="my-5"/>

                            <div className="flex justify-between text-2xl font-bold">

                                <span>Total</span>

                                <span>
                                    ₹{total}
                                </span>

                            </div>

                            <button
                                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl text-lg font-semibold"
                            >
                                Proceed to Checkout
                            </button>

                            <Link
                                to="/"
                                className="block text-center mt-5 text-indigo-600 font-semibold"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                }

            </div>

        </div>

        <Footer/>

        </>

    );

};

export default Cart;