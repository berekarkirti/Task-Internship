
"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Loading from "@/component/product/loading"; 
import { product } from "@/app/data/product";

const Product = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);

  if (loading) return <Loading />; 

  return (
    <div className="grid grid-cols-3">
      {product.map((item, index) => (
        <div key={index} className="mt-10">
          <Link href={`/description/${item.slug}`}>
            <p>{item.description}</p>
          </Link>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Product;