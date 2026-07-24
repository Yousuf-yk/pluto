import { ShoppingCart } from "lucide-react";

function Card({ product }) {

  const {
    name,
    price,
    description,
    image_url,
    category
  } = product;

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border ">
      <div className="h-56 overflow-hidden bg-gray-100">
        <img
          src={`http://localhost:3000/uploads/${image_url}`}
          alt={name}
          className="h-60 w-96 object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-indigo-600 font-semibold">
          {category}
        </p>
        <h2 className="text-xl font-bold mt-2">
          {name}
        </h2>
        <p className="text-gray-600 mt-3 flex-grow">
          {description}
        </p>
        <div className="flex items-center justify-between mt-6">
          <span className="text-2xl font-bold text-rose-600">
            ₹{price}
          </span>
          <button
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            <ShoppingCart size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );

}

export default Card;