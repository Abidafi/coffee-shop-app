"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";

function ItemDetailsContent() {
  const params = useParams();
  const id = params?.id;

  const item = {
    title: "Ethiopian Yirgacheffe",
    category: "Single Origin",
    price: 18.50,
    rating: 4.8,
    description: "Bright acidity with floral notes and smooth jasmine undertones.",
    fullDescription: "Ethiopian Yirgacheffe is widely celebrated as one of the finest specialty coffees in the world.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
    origin: "Yirgacheffe, Ethiopia",
    altitude: "1,900 - 2,200 MASL",
    process: "Fully Washed",
    roastLevel: "Light-Medium"
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        <Link href="/items" className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-800 font-medium mb-6 transition">
          <ArrowLeft className="w-4 h-4"/> Back to Catalog
        </Link>

        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-80 md:h-full bg-stone-100 relative">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-md">{item.category}</span>
                <span className="flex items-center gap-1 text-sm font-bold text-amber-700"><Star className="w-4 h-4 fill-amber-500 text-amber-500"/> {item.rating}</span>
              </div>
              <h1 className="text-3xl font-extrabold text-stone-900 mt-2">{item.title}</h1>
              <p className="text-2xl font-bold text-amber-900 mt-4">${item.price.toFixed(2)}</p>
              <p className="text-stone-600 text-sm mt-4 leading-relaxed">{item.fullDescription}</p>
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