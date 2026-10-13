"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, ArrowLeft } from "lucide-react";

export interface CoffeeItem {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

const INITIAL_ITEMS: CoffeeItem[] = [
  { id: "1", title: "Ethiopian Yirgacheffe", category: "Single Origin", price: 18.50, rating: 4.8, description: "Bright acidity with floral notes and smooth jasmine undertones.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600" },
  { id: "2", title: "Colombian Supremo", category: "Single Origin", price: 16.00, rating: 4.7, description: "Rich caramel sweetness with a well-balanced nutty aroma.", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=600" },
  { id: "3", title: "Midnight Espresso Roast", category: "Espresso Blends", price: 19.00, rating: 4.9, description: "Bold dark chocolate and smoky molasses notes with thick crema.", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=600" },
  { id: "4", title: "Sumatra Mandheling", category: "Single Origin", price: 20.00, rating: 4.6, description: "Full-bodied with earthy herbal notes and low acidity.", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=600" },
  { id: "5", title: "Velvet House Blend", category: "Espresso Blends", price: 15.50, rating: 4.5, description: "Smooth milk chocolate flavor profile tailored for daily lattes.", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=600" },
  { id: "6", title: "Hario V60 Dripper Kit", category: "Equipment", price: 32.00, rating: 4.9, description: "Professional ceramic pour-over cone for clean extraction.", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600" },
];

export default function ItemsPage() {
  const [items, setItems] = useState<CoffeeItem[]>(INITIAL_ITEMS);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(40);

  useEffect(() => {
    const saved = localStorage.getItem("coffee_items");
    if (saved) {
      try {
        setItems([...INITIAL_ITEMS, ...JSON.parse(saved)]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesPrice = item.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="bg-stone-900 text-white py-12 px-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link href="/" className="text-amber-400 text-sm font-semibold flex items-center gap-1 mb-2 hover:underline"><ArrowLeft className="w-4 h-4"/> Back to Home</Link>
            <h1 className="text-3xl font-bold">Artisan Menu & Catalog</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 w-5 h-5 text-stone-400"/>
            <input 
              type="text" 
              placeholder="Search coffee or equipment..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"
            />
          </div>

          <div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"
            >
              <option value="All">All Categories</option>
              <option value="Single Origin">Single Origin</option>
              <option value="Espresso Blends">Espresso Blends</option>
              <option value="Equipment">Equipment</option>
            </select>
          </div>

          <div className="flex items-center gap-3 px-2">
            <span className="text-xs text-stone-500 whitespace-nowrap">Max Price: ${maxPrice}</span>
            <input 
              type="range" 
              min="10" 
              max="50" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-amber-700"
            />
          </div>
        </div>

        {/* Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-md transition group flex flex-col justify-between">
              <div>
                <div className="h-52 bg-stone-100 overflow-hidden relative">
                  <img src={item.image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  <span className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-medium">★ {item.rating}</span>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">{item.category}</span>
                  <h3 className="text-lg font-bold mt-2 text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 text-sm mt-1 line-clamp-2">{item.description}</p>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center justify-between">
                <span className="text-xl font-bold text-stone-900">${item.price.toFixed(2)}</span>
                <Link href={`/items/${item.id}`} className="bg-stone-900 hover:bg-amber-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}