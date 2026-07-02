'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './Category.css'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE}/categories/`);
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="categoriesLoading">Loading categories...</div>;
  }

  return (
    <div className="categoriesPage">
      <h1 className="categoriesTitle">Shop by Category</h1>

      <div className="categoriesGrid">
        {categories.map((category) => (
          <Link
            href={`/categories/${category.slug}`} 
            className="categoryCard"
            key={category.id}
          >
            <div className="categoryImageWrapper">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={350}
                  height={260}
                  className="categoryImage"
                />
              ) : (
                <div className="categoryPlaceholder">No Image</div>
              )}

              <div className="categoryOverlay">
                <h3>{category.name}</h3>
                <span className="categoryCta">View Collection →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
