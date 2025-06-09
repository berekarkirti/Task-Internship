"use client";

import { use } from "react";

export default function ProductDetailPage({ params }) {
  const Params = use(params);
  const { id, slug } = Params;

  return (
    <div>
      <h1>Product Detail</h1>
      <p>Product ID: {id}</p>
      <p>Product Slug: {slug}</p>
      <p>Here you can display detailed information about the product.</p>
    </div>
  );
}
