const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <div className="card bg-primary text-white shadow-xl">
          <div className="card-body">
            <h2>Total Products</h2>
            <p className="text-3xl font-bold">120</p>
          </div>
        </div>

        <div className="card bg-secondary text-white shadow-xl">
          <div className="card-body">
            <h2>Total Orders</h2>
            <p className="text-3xl font-bold">560</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
