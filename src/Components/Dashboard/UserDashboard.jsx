const UserDashboard = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold">User Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-5 mt-6">
        <div className="card bg-success text-white shadow-xl">
          <div className="card-body">
            <h2>My Orders</h2>
            <p className="text-3xl font-bold">12</p>
          </div>
        </div>

        <div className="card bg-info text-white shadow-xl">
          <div className="card-body">
            <h2>Wishlist</h2>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
