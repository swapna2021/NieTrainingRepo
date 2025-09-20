import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type Product from "../model/product";
import fetchProducts from "../api/productapis";
import { fetchProductById } from "../api/productapis";
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
        // 1) try GET by id
        const res = await fetchProductById(Number(id));
        setProduct(res.data);
      } catch (e) {
        // 2) if 404, fallback: fetch all and find locally
        if (isAxiosError(e) && e.response?.status === 404) {
          try {
            const list = await fetchProducts();
            // compare both number and string just in case the backend stores id as string
            const found = list.data.find(
              (p: Product) => String(p.id) === String(id)
            );
            if (found) {
              setProduct(found);
            } else {
              setError(`Product not found (id: ${id})`);
            }
          } catch (e2) {
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

  return (
    <div className="card" style={{ width: "24rem" }}>
      <div className="card-body">
        <h3 className="card-title">Product Info</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>ID:</strong> {product.id}</li>
          <li className="list-group-item"><strong>Name:</strong> {product.name ?? ""}</li>
          <li className="list-group-item"><strong>Description:</strong> {product.description ?? ""}</li>
          <li className="list-group-item"><strong>Category:</strong> {product.category ?? ""}</li>
          <li className="list-group-item">
            <strong>Tags:</strong> {(product.tags ?? []).join(", ")}
          </li>
          <li className="list-group-item"><strong>Price:</strong> {product.price}</li>
          <li className="list-group-item"><strong>Stock:</strong> {product.stock}</li>
        </ul>
      </div>
    </div>
  );
}