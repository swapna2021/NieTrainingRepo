import React, { useEffect, useState } from "react";
import type Product from "../model/product";          
import fetchProducts, { deleteProduct } from "../api/productapis";      
import { isAxiosError } from "axios";
import { Link } from "react-router-dom";

function ListProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        const res = await fetchProducts();
        if (alive) setProducts(res.data);
      } catch (e: unknown) {
        if (!alive) return;
        if (isAxiosError(e)) {
          setError(e.response?.data?.message ?? e.message);
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Failed to fetch products");
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, []);

  if (loading) return <div>Loading products…</div>;
  if (error)   return <div className="text-danger">{error}</div>;

const handleDelete=async(id: number) => {
  try {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  return (
    <div>
      <h1>List Products Component</h1>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                    <Link to={`/edit/${p.id}`} className="btn btn-success btn-sm me-2">Edit</Link>
                    <Link to={`/info/${p.id}`} className="btn btn-info btn-sm me-2">Info</Link>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(p.id)}  
                >
                  Delete
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">No products found</td>
            </tr>
          )}
          
          
        </tbody>
      </table>
    </div>
  );
}

export default ListProducts;