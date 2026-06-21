import { useQuery } from "@tanstack/react-query";
import { getCartSummary } from "../api/cartApi";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const CartSummary = () => {
  const { user } = useContext(AuthContext);

  const { data = {} } = useQuery({
    queryKey: ["summary", user?.email],
    enabled: !!user?.email,
    queryFn: () => getCartSummary(user.email),
  });

  return (
    <div className="card bg-base-200 p-6">
      <h2 className="text-2xl font-bold">Order Summary</h2>

      <div className="mt-4 space-y-2">
        <p>
          Total Products:
          {data.totalItems}
        </p>

        <p>Subtotal: ৳ {data.subtotal}</p>
      </div>

      <button className="btn btn-primary mt-5">Checkout</button>
    </div>
  );
};

export default CartSummary;
