"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { Coffee, Lock, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signInWithGoogle } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8">
        <Link href="/" className="inline-flex items-center gap-1 text-stone-500 text-sm hover:text-amber-800 mb-6"><ArrowLeft className="w-4 h-4"/> Back to Home</Link>
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 mx-auto mb-3"><Coffee className="w-6 h-6"/></div>
          <h1 className="text-2xl font-bold text-stone-900">{isRegister ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-stone-500 text-sm mt-1">Sign in to manage your coffee catalog and orders</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400"/>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-600 block mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-400"/>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-600"/>
            </div>
          </div>

          <button type="submit" className="w-full bg-amber-800 hover:bg-amber-900 text-white font-bold py-3.5 rounded-xl shadow-md transition">
            {isRegister ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-stone-200"></div></div>
          <span className="relative bg-white px-3 text-xs text-stone-400 uppercase">Or continue with</span>
        </div>

        <button onClick={handleGoogleLogin} className="w-full border border-stone-200 hover:bg-stone-50 font-medium text-stone-700 py-3 rounded-xl transition flex items-center justify-center gap-2 text-sm">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Google
        </button>

        <p className="text-center text-xs text-stone-500 mt-6">
          {isRegister ? "Already have an account?" : "Don't have an account?"} {" "}
          <button onClick={() => setIsRegister(!isRegister)} className="text-amber-800 font-bold hover:underline">
            {isRegister ? "Sign In" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}