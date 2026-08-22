import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { getProducts } from "@/services/productApi";
import { getUsers } from "@/services/authApi";
import { deleteProduct } from "@/services/adminProductApi";

const API_URL = "http://localhost:3000";

function Page() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productData, userData] = await Promise.all([
          getProducts(),
          getUsers(),
        ]);


        setProducts(Array.isArray(productData) ? productData : productData.products || []);
        setUsers(Array.isArray(userData) ? userData : userData.users || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();


  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this product permanently?");


    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete product");
    }


  };

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "18rem",
        "--header-height": "4rem",
      }}
    > <AppSidebar variant="inset" />


      <SidebarInset>
        <SiteHeader />

        <div className="flex flex-1 flex-col gap-6 p-6 bg-[var(--color-background)]">
          <div>
            <h1 className="text-3xl font-bold text-[var(--color-text)]">
              Admin Dashboard
            </h1>
            <p className="text-[var(--color-text-muted)] mt-1">
              Manage products and users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
              <p className="text-sm text-[var(--color-text-muted)]">
                Total Products
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {products.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
              <p className="text-sm text-[var(--color-text-muted)]">
                Total Users
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {users.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5">
              <p className="text-sm text-[var(--color-text-muted)]">
                Categories
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {[...new Set(products.map((p) => p.category))].length}
              </h2>
            </div>
          </div>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="p-5 border-b border-[var(--color-border)] flex justify-between items-center">
              <h2 className="text-xl font-semibold">Products</h2>
              <button className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white">
                Add Product
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--color-surface-secondary)]">
                    <tr>
                      <th className="text-left p-4">Image</th>
                      <th className="text-left p-4">Product</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">Price</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-[var(--color-border)]">
                        <td className="p-4">
                          <img
                            src={`${API_URL}/uploads/${product.image_url}`}
                            // src={`http://localhost:5000/uploads/${product.image_url}`}/>
                            alt={product.name}
                            className="w-14 h-14 rounded-lg object-cover"
                            onError={(e) => {
                              e.target.src = "https://placehold.co/56x56?text=No+Image";
                            }}
                          />
                        </td>

                        <td className="p-4 font-medium">
                          {product.name}
                        </td>

                        <td className="p-4">{product.category}</td>

                        <td className="p-4 font-semibold">
                          ₹{product.price}
                        </td>

                        <td className="p-4">{product.stock}</td>

                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 rounded-md border">
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(product.id)}
                              className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="p-5 border-b border-[var(--color-border)]">
              <h2 className="text-xl font-semibold">Users</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-surface-secondary)]">
                  <tr>
                    <th className="text-left p-4">ID</th>
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Email</th>
                    <th className="text-left p-4">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-[var(--color-border)]">
                      <td className="p-4">{user.id}</td>
                      <td className="p-4 font-medium">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4">
                        {user.created_at
                          ? new Date(user.created_at).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>


  );
}

export default Page;
