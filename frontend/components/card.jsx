import React from 'react';
import { ShoppingCart } from 'lucide-react';

function Card({ product }) {
  // We destructure the properties we need from the product object
  // Fallback values (like || 'Unknown Product') prevent crashes if DB data is missing
  const { 
    title = 'Unknown Product', 
    price = 0, 
    description = 'No description available.', 
    imageUrl = 'https://via.placeholder.com/300' // Fallback image
  } = product;

  return (
    <div className="flex flex-col max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      
      {/* Product Image Section */}
      <div className="relative h-56 w-full overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{title}</h3>
          <span className="text-lg font-bold text-indigo-600">${price.toFixed(2)}</span>
        </div>
        
        {/* description line-clamp-2 keeps it to exactly 2 lines before adding ... */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* Action Button */}
        <button className="w-full mt-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-medium transition-colors">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
      
    </div>
  );
}

export default Card;