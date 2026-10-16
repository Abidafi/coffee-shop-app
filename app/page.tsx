"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  Coffee,
  Shield,
  Star,
  ArrowRight,
  Menu,
  X,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";

export default function LandingPage() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Problem #7: ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Problem #7: close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-stone-800">
      {/* Section 1: Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-amber-900">
            <Coffee className="w-8 h-8 text-amber-700" />
            <span>Bean & Brew</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-medium text-stone-600">
            <Link href="/" className="hover:text-amber-800 transition">Home</Link>
            <Link href="/items" className="hover:text-amber-800 transition">Menu & Items</Link>
            <Link href="/about" className="hover:text-amber-800 transition">About Us</Link>
            <Link href="/items/manage" className="hover:text-amber-800 transition">Manage</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              // ✅ Problem #7: ref attached here
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-900 px-4 py-2 rounded-full font-medium transition"
                >
                  <img
                    src={user.photoURL || "https://github.com/shadcn.png"}
                    alt="User"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{user.displayName || user.email?.split("@")[0]}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-stone-100 text-xs text-stone-500">
                      Signed in as <br />
                      <strong className="text-stone-800">{user.email}</strong>
                    </div>
                    <Link
                      href="/items/add"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-700" /> Add Product
                    </Link>
                    <Link
                      href="/items/manage"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 hover:bg-amber-50"
                    >
                      <Settings className="w-4 h-4 text-amber-700" /> Manage Products
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-stone-100"
                    >
                      <LogOut className="w-4 h-4" /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-amber-800 hover:bg-amber-900 text-white px-5 py-2.5 rounded-full font-medium shadow-md transition"
              >
                Login / Register
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-stone-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Section 2: Hero */}
      <section className="relative bg-linear-to-r from-amber-900 to-stone-900 text-white py-28 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-amber-800/60 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest border border-amber-700/50">
            Artisanal Roasted Coffee
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-6 tracking-tight">
            Awaken Your Senses with Every Single Cup
          </h1>
          <p className="text-lg md:text-xl text-stone-300 mb-10 max-w-2xl mx-auto">
            Explore ethically sourced single-origin coffee beans, signature handcrafted
            espresso blends, and decadent bakery pastries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/items"
              className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-8 py-4 rounded-full shadow-lg transition flex items-center justify-center gap-2"
            >
              Explore Menu <ArrowRight className="w-5 h-5" />
            </Link>
            {!user && (
              <Link
                href="/login"
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-full transition"
              >
                Join Community
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-stone-900">Why Coffee Lovers Choose Us</h2>
          <p className="text-stone-600 mt-2">Crafted with absolute precision from farm to cup.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/80 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 mb-6">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">100% Organic Beans</h3>
            <p className="text-stone-600 leading-relaxed">
              Directly sourced from sustainable high-altitude farms across South America and
              Africa.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/80 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 mb-6">
              <Star className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Master Roasters</h3>
            <p className="text-stone-600 leading-relaxed">
              Small-batch roasted daily to guarantee exceptional aroma, body, and rich crema.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200/80 hover:shadow-md transition">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-800 mb-6">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Freshness Guarantee</h3>
            <p className="text-stone-600 leading-relaxed">
              Sealed immediately post-roast with valve technology to lock in peak flavor
              profiles.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Popular Items Preview */}
      <section className="bg-stone-100/70 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-stone-900">Featured Blends</h2>
              <p className="text-stone-600 mt-1">
                Our customer-favorite selections this season.
              </p>
            </div>
            <Link
              href="/items"
              className="text-amber-800 font-semibold hover:underline flex items-center gap-1"
            >
              View All Menu <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-md transition group"
              >
                <div className="h-48 bg-amber-900/10 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
                    alt="Coffee"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                    Signature Blend
                  </span>
                  <h3 className="text-lg font-bold mt-2 text-stone-900">
                    Ethiopian Yirgacheffe
                  </h3>
                  <p className="text-stone-600 text-sm mt-1 line-clamp-2">
                    Bright acidity with delicate floral notes and smooth jasmine undertones.
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-bold text-stone-900">$18.50</span>
                    <Link
                      href={`/items/${item}`}
                      className="bg-stone-900 hover:bg-amber-800 text-white text-sm px-4 py-2 rounded-xl transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Banner CTA */}
      <section className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="bg-amber-900 text-white rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold">Get 15% off your very first order!</h2>
            <p className="text-amber-200 mt-2 max-w-xl">
              Join our coffee subscription club today and get freshly ground artisan coffee
              delivered straight to your doorstep.
            </p>
          </div>
          <Link
            href="/items"
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-4 rounded-full whitespace-nowrap shadow-lg transition"
          >
            Browse Catalog
          </Link>
        </div>
      </section>

      {/* Section 6: Testimonials */}
      <section className="bg-stone-100/70 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-stone-900 mb-3">
            Loved by Coffee Connoisseurs
          </h2>
          <p className="text-stone-600 mb-12">Here is what our loyal customers have to say.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex gap-1 text-amber-500 mb-4">{"★".repeat(5)}</div>
              <p className="text-stone-700 italic">
                  &quot;The aroma when opening the bag is unmatched. Bean &amp; Brew has completely
                  elevated my morning coffee routine!&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center font-bold text-amber-900 justify-center">
                  JS
                </div>
                <div>
                  <h4 className="font-bold text-sm">Jessica Smith</h4>
                  <span className="text-xs text-stone-500">Verified Subscriber</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
              <div className="flex gap-1 text-amber-500 mb-4">{"★".repeat(5)}</div>
              <p className="text-stone-700 italic">
                 &quot;Incredible customer support and blazing fast delivery. The Colombian Dark
                 Roast is absolute perfection.&quot;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center font-bold text-amber-900 justify-center">
                  DM
                </div>
                <div>
                  <h4 className="font-bold text-sm">David Miller</h4>
                  <span className="text-xs text-stone-500">Verified Buyer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 px-4 border-t border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Coffee className="w-6 h-6 text-amber-500" /> Bean & Brew
            </div>
            <p className="text-sm">
              Your premier destination for specialty artisan coffee beans and craft brewing
              gear.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-white transition">
                  Menu & Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">About Us</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-white cursor-pointer">Single Origin</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Espresso Blends</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">Brewing Equipment</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Stay Updated</h4>
            <p className="text-xs mb-3">
              Subscribe for secret roast drops and brewing tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white w-full focus:outline-none focus:border-amber-500"
              />
              <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          © 2026 Bean & Brew Inc. All rights reserved. Built with Next.js & Firebase.
        </div>
      </footer>
    </div>
  );
}