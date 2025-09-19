export default function AdminDashboard() {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#333", color: "white", height: "100vh", padding: "20px" }}>
        <h3>Admin Panel</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><a href="/add-product" style={{ color: "white" }}>➕ Add Product</a></li>
          <li><a href="/admin/products" style={{ color: "white" }}>📦 View Products</a></li>
          <li><a href="/admin/orders" style={{ color: "white" }}>📑 Orders</a></li>
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h1>Welcome to Admin Dashboard</h1>
        <p>Select an option from the sidebar.</p>
      </div>
    </div>
  )
}