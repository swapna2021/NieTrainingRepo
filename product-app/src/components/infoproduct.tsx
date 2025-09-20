import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type Product from "../model/product";
import fetchProducts, { fetchProductById } from "../api/productapis";
import { isAxiosError } from "axios";

export default function InfoProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        
        const res = await fetchProductById(id);
        setProduct(res.data);
      } catch (e) {
        if (isAxiosError(e) && e.response?.status === 404) {
          try {
            const list = await fetchProducts();
            const found = list.data.find((p: Product) => String(p.id) === String(id));
            if (found) setProduct(found);
            else setError(`Product not found (id: ${id})`);
          } catch {
            setError("Failed to load products for fallback search.");
          }
        } else {
          setError("Failed to load product.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div>Loading product details…</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!product) return <div>No product found.</div>;

  
  const tagsText = Array.isArray(product.tags)
    ? product.tags.join(", ")
    : String(product.tags ?? "");

  return (
  <div className="card" style={{ width: "32rem" }}>
    <div className="card-body">
      <h3 className="card-title">Product Info</h3>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">ID</th>
            <td>{product.id}</td>
          </tr>
          <tr>
            <th scope="row">Name</th>
            <td>{product.name ?? ""}</td>
          </tr>
          <tr>
            <th scope="row">Description</th>
            <td>{product.description ?? ""}</td>
          </tr>
          <tr>
            <th scope="row">Category</th>
            <td>{product.category ?? ""}</td>
          </tr>
          <tr>
            <th scope="row">Tags</th>
            <td>{tagsText}</td>
          </tr>
          <tr>
            <th scope="row">Price</th>
            <td>{product.price}</td>
          </tr>
          <tr>
            <th scope="row">Stock</th>
            <td>{product.stock}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
}