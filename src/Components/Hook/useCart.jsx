import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../api/cartApi";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);

  const {
    data: cart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: () => getCartItems(user.email),
  });

  return {
    cart,
    refetch,
    isLoading,
  };
};

export default useCart;
