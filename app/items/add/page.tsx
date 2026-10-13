"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeft, PlusCircle, CheckCircle } from "lucide-react";

export default function AddItemPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Single Origin");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("4.8");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      title,
      category,
      price: Number(price),
      rating: Number(rating),
      description,
      image: image || "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd"
    };

    const existing = JSON.parse(localStorage.getItem("coffee_items") || "[]");
    localStorage.setItem("coffee_items", JSON.stringify([newItem, ...existing]));

    setSuccessMsg(true);
    setTimeout(() => {
      router.push("/items");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="max-w-2xl mx-auto px-4 pt-10">
        <Link href="/" className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-800 font-medium mb-6"><ArrowLeft className="w-4 h-4"/> Back to Home</Link>

        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-stone-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800"><PlusCircle className="w-6 h-6"/></div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">Add New Coffee Product</h1>
              <p className="text-xs text-stone-500">Publish a new item directly to your store catalog</p>
            </div>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 flex items-center gap-2 text-sm font-medium">
              <CheckCircle className="w-5 h-5"/> Product added successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">Product Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Kenya Nyeri AA" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600">
                  <option value="Single Origin">Single Origin</option>
                  <option value="Espresso Blends">Espresso Blends</option>
                  <option value="Equipment">Equipment</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-stone-600 block mb-1">Price ($)</label>
                <input type="number" step="0.01" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="18.50" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">Short Description</label>
              <textarea required rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief flavor notes or specifications..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 block mb-1">Optional Image URL</label>
              <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
            </div>

            <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-4 rounded-xl shadow-md transition mt-4">
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}