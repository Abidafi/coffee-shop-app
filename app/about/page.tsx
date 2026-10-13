import React from "react";
import Link from "next/link";
import { Coffee, ArrowLeft, Heart, Award, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50/30 text-stone-800 pb-20">
      <div className="bg-stone-900 text-white py-16 px-4 mb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-amber-400 text-sm font-semibold mb-4 hover:underline"><ArrowLeft className="w-4 h-4"/> Back to Home</Link>
          <h1 className="text-4xl font-extrabold">Our Coffee Story</h1>
          <p className="text-stone-300 mt-3 text-lg">Passionate about sustainable sourcing, artisan roasting, and community connection.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-stone-200 mb-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Crafting Perfection Since 2020</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Bean & Brew started with a simple belief: great coffee shouldn't just wake you up; it should tell a story. Founded by master roasters and devoted coffee enthusiasts, we partner directly with independent family farms across Ethiopia, Colombia, and Sumatra.
          </p>
          <p className="text-stone-600 leading-relaxed">
            Every green bean is hand-inspected and micro-roasted in small batches to preserve its distinct geographic flavor notes. Whether you prefer a bright morning pour-over or a rich, creamy espresso shot, our mission is to deliver café-quality excellence straight to your kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center">
            <Globe className="w-8 h-8 text-amber-700 mx-auto mb-3"/>
            <h3 className="font-bold text-stone-900 mb-1">Direct Fair Trade</h3>
            <p className="text-xs text-stone-600">Empowering farming communities with transparent pricing.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center">
            <Award className="w-8 h-8 text-amber-700 mx-auto mb-3"/>
            <h3 className="font-bold text-stone-900 mb-1">Master Roasted</h3>
            <p className="text-xs text-stone-600">Precision roasting curves custom-tailored per bean origin.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 text-center">
            <Heart className="w-8 h-8 text-amber-700 mx-auto mb-3"/>
            <h3 className="font-bold text-stone-900 mb-1">Eco Friendly</h3>
            <p className="text-xs text-stone-600">100% biodegradable packaging and carbon-neutral shipping.</p>
          </div>
        </div>
      </div>
    </div>
  );
}