"use client";
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";

interface CoffeeItem {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  description: string;
  image: string;
}

const INITIAL_ITEMS: CoffeeItem[] = [
  { id: "1", title: "Ethiopian Yirgacheffe", category: "Single Origin", price: 18.5, rating: 4.8, description: "Bright acidity with floral notes and smooth jasmine undertones.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800" },
  { id: "2", title: "Colombian Supremo", category: "Single Origin", price: 16.0, rating: 4.7, description: "Rich caramel sweetness with a well-balanced nutty aroma.", image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800" },
  { id: "3", title: "Midnight Espresso Roast", category: "Espresso Blends", price: 19.0, rating: 4.9, description: "Bold dark chocolate and smoky molasses notes with thick crema.", image: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&q=80&w=800" },
  { id: "4", title: "Sumatra Mandheling", category: "Single Origin", price: 20.0, rating: 4.6, description: "Full-bodied with earthy herbal notes and low acidity.", image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&q=80&w=800" },
  { id: "5", title: "Velvet House Blend", category: "Espresso Blends", price: 15.5, rating: 4.5, description: "Smooth milk chocolate flavor profile tailored for daily lattes.", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800" },
  { id: "6", title: "Hario V60 Dripper Kit", category: "Equipment", price: 32.0, rating: 4.9, description: "Professional ceramic pour-over cone for clean extraction.", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800" },
];

function ItemDetailsContent() {
  const params = useParams();
  const id = params?.id as string;
  const [item, setItem] = useState<CoffeeItem | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("coffee_items");
    const custom: CoffeeItem[] = saved ? JSON.parse(saved) : [];
    const all = [...INITIAL_ITEMS, ...custom];
    setItem(all.find((i) => i.id === id) || null);
  }, [id]);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-stone-600">Product not found.</p>
        <Link href="/items" className="text-amber-800 font-semibold hover:underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Link href="/items" className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-800 font-medium mb-6 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-80 md:h-full bg-stone-100 relative">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-md">{item.category}</span>
                <span className="flex items-center gap-1 text-sm font-bold text-amber-700">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" /> {item.rating}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-stone-900 mt-2">{item.title}</h1>
              <p className="text-2xl font-bold text-amber-900 mt-4">${item.price.toFixed(2)}</p>
              <p className="text-stone-600 text-sm mt-4 leading-relaxed">{item.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ItemDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading product...</div>}>
      <ItemDetailsContent />
    </Suspense>
  );
}