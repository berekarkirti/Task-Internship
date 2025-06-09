import Cart from "@/component/Cart";
import ProductList from "@/component/ProductList";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-teal-600">
      <h1 className="text-2xl font-bold text-center mb-6">Your Cart</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}
