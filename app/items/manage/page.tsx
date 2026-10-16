"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { ArrowLeft, Trash2, Eye, Settings } from "lucide-react";
import { CoffeeItem } from "@/types/coffee";

export default function ManageItemsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<CoffeeItem[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    const saved = localStorage.getItem("coffee_items");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, [user, loading, router]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      localStorage.setItem("coffee_items", JSON.stringify(updated));
    }
  };

  if (loading || !user)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-800 font-medium mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-stone-900">Manage Products</h1>
                <p className="text-xs text-stone-500">
                  Review, inspect, or delete user-submitted store items
                </p>
              </div>
            </div>
            <Link
              href="/items/add"
              className="bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-amber-900 transition"
            >
              Add New Item
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              No custom products found in local storage. Try adding one!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-200 text-xs uppercase text-stone-500">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-sm">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-50 transition">
                      <td className="py-4 px-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-stone-900">{item.title}</span>
                      </td>
                      <td className="py-4 px-4 text-stone-600">
                        <span className="bg-amber-50 text-amber-800 text-xs px-2.5 py-1 rounded-md">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-stone-900">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          href={`/items/${item.id}`}
                          className="inline-flex p-2 bg-stone-100 hover:bg-stone-200 rounded-lg text-stone-700 transition"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}