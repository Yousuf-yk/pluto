import React, { useState } from 'react';
import { Settings, Heart, ShoppingCart, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Fixed wrapper to keep the navbar floating at the top
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] lg:w-[80%] z-50">
      
      {/* Main Navbar Bar */}
      <div className="flex items-center justify-between h-14 px-6 bg-white/40 backdrop-blur-md border border-white/30 shadow-lg rounded-[25px] font-sans transition-all duration-300">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tighter text-rose-200">
          pluto.
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium text-rose-200">
          <a href="#home" className="hover:text-rose-200 transition-colors">Home</a>
          <a href="#shop" className="hover:text-rose-200 transition-colors">Shop</a>
          <a href="#about" className="hover:text-rose-200 transition-colors">About</a>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-2">
          <button 
            aria-label="Favorites" 
            className="p-2 text-gray-700 hover:bg-white/60 hover:text-rose-200 rounded-full transition-all"
          >
            <Heart size={20} />
          </button>
          <button 
            aria-label="Cart" 
            className="p-2 text-gray-700 hover:bg-white/60 hover:text-rose-200 rounded-full transition-all"
          >
            <ShoppingCart size={20} />
          </button>
          <button 
            aria-label="Settings" 
            className="p-2 text-gray-700 hover:bg-white/60 hover:text-rose-200 rounded-full transition-all"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="p-2 text-gray-700 hover:bg-white/60 rounded-full transition-all"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl md:hidden p-4 flex flex-col space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <a href="#home" className="block px-4 py-3 text-gray-800 font-medium hover:bg-white/60 rounded-xl transition-all">Home</a>
          <a href="#shop" className="block px-4 py-3 text-gray-800 font-medium hover:bg-white/60 rounded-xl transition-all">Shop</a>
          <a href="#about" className="block px-4 py-3 text-gray-800 font-medium hover:bg-white/60 rounded-xl transition-all">About</a>
          
          {/* Mobile Icons Row */}
          <div className="flex justify-around pt-4 mt-2 border-t border-gray-300/50">
            <button className="p-3 text-gray-700 hover:bg-white/60 hover:text-indigo-600 rounded-full transition-all">
              <Heart size={24} />
            </button>
            <button className="p-3 text-gray-700 hover:bg-white/60 hover:text-indigo-600 rounded-full transition-all">
              <ShoppingCart size={24} />
            </button>
            <button className="p-3 text-gray-700 hover:bg-white/60 hover:text-indigo-600 rounded-full transition-all">
              <Settings size={24} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;