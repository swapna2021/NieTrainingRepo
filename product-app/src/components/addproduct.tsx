import { useState } from "react";
import Product from "../model/product";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../api/productapis";

function AddProduct() {
  const [product, setProduct] = useState<Product>(new Product());
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const payload = {
      ...product,
      id: String(product.id),
      tags: Array.isArray(product.tags) ? product.tags.join(",") : (product.tags ?? "")
    };

    try {
      await addProduct(payload as unknown as Product);
      alert("Product added successfully!");
      navigate("../listproducts");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">Add Product</h5>

          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="inputId">Id</label>
              <input
                type="text"
                className="form-control"
                id="inputId"
                placeholder="Id"
                value={product.id}
                onChange={(e) =>
                  setProduct({ ...product, id: Number(e.target.value) })
                }
              />
            </div>

            <div className="form-group row">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Name"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>

            <div className="form-group row">
              <label htmlFor="inputDesc">Description</label>
              <input
                type="text"
                className="form-control"
                id="inputDesc"
                placeholder="Description"
                value={product.description}
                onChange={(e) =>
                  setProduct({ ...product, description: e.target.value })
                }
              />
            </div>

            <div className="form-group row">
              <label htmlFor="inputCategory">Category</label>
              <input
                type="text"
                className="form-control"
                id="inputCategory"
                placeholder="Category"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </div>

            <div className="form-group row">
              <label htmlFor="inputTags">Tags</label>
              <input
                type="text"
                className="form-control"
                id="inputTags"
                placeholder="tag1, tag2, tag3"
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

            <div className="form-group row">
              <label htmlFor="inputPrice">Price</label>
              <input
                type="number"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: Number(e.target.value) })
                }
              />
            </div>

            <div className="form-group row">
              <label htmlFor="inputStock">Stock</label>
              <input
                type="number"
                className="form-control"
                id="inputStock"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: Number(e.target.value) })
                }
              />
            </div>

            <br />
            <div>
              <button type="submit" className="btn btn-primary">
                Add Product
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AddProduct;