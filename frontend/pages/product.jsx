import React from 'react';
import { ShoppingCart } from 'lucide-react';

function ProductCard({ 
  title = "Premium Wireless Headphones", // Default values for testing
  price = 199.99, 
  category = "Electronics",
  imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
}) {
  return (
    // Card Container
    // h-full ensures cards in a grid stretch to match each other's height
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 w-full max-w-sm">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
        {/* Floating Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
          {category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title and Price */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1" title={title}>
            {title}
          </h3>
          <p className="text-xl font-bold text-indigo-600 mt-1">
            ${price.toFixed(2)}
          </p>
        </div>

        {/* Action Button */}
        {/* mt-auto pushes the button to the bottom if titles are different lengths */}
        <button className="mt-auto flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-indigo-600 text-white py-3 rounded-xl transition-colors duration-200 font-medium active:scale-[0.98]">
          <ShoppingCart size={18} />
          <span>Add to Cart</span>
        </button>
        
      </div>
    </div>
  );
}

export default ProductCard;