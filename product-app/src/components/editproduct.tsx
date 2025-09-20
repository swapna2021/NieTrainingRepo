import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type Product from "../model/product";
import { fetchProductById, updateProduct } from "../api/productapis";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const pid = Number(id);
    (async () => {
      try {
        console.log("GET product", pid);               // <-- log
        const res = await fetchProductById(pid);
        console.log("GET product response:", res.data); // <-- log the payload
        setProduct(res.data);                           // prefill
      } catch (e) {
        console.error("Failed to load product:", e);
        setError("Failed to load product");
      }
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    try {
      await updateProduct(product);
      alert("Product updated successfully!");
      navigate("/listproducts");
    } catch (e) {
      console.error("Update failed:", e);
      alert("Failed to update product");
    }
  };

  if (error) return <div className="text-danger">{error}</div>;
  if (!product) return <div>Loading product…</div>; // <- don't show empty defaults

  return (
    <div className="card" style={{ width: "28rem" }}>
      <div className="card-body">
        <h5 className="card-title">Edit Product</h5>

        <form onSubmit={handleSubmit}>
          {/* ID (read-only) */}
          <div className="form-group mb-2">
            <label htmlFor="id">ID</label>
            <input
              type="number"
              id="id"
              className="form-control"
              value={product.id}
              readOnly
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form-control"
              value={product.name ?? ""}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={product.description ?? ""}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="category">Category</label>
            <input
              id="category"
              className="form-control"
              value={product.category ?? ""}
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="tags">Tags (comma separated)</label>
            <input
              id="tags"
              className="form-control"
              value={(product.tags ?? []).join(", ")}
              onChange={(e) =>
                setProduct({
                  ...product,
                  tags: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>

          <div className="form-group mb-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              className="form-control"
              value={product.price ?? 0}
              onChange={(e) =>
                setProduct({ ...product, price: Number(e.target.value) })
              }
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              id="stock"
              className="form-control"
              value={product.stock ?? 0}
              onChange={(e) =>
                setProduct({ ...product, stock: Number(e.target.value) })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  );
}