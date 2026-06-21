import {
  increaseQuantity,
  decreaseQuantity,
  deleteCartItem,
} from "../../api/cartApi";

const CartItem = ({ item, refetch }) => {
  const handleIncrease = async () => {
    await increaseQuantity(item._id);
    refetch();
  };

  const handleDecrease = async () => {
    await decreaseQuantity(item._id);
    refetch();
  };

  const handleDelete = async () => {
    await deleteCartItem(item._id);
    refetch();
  };

  return (
    <div className="border rounded-xl p-5 flex justify-between">
      <div className="flex gap-5">
        <img src={item.image} className="w-24" />

        <div>
          <h2 className="font-bold">{item.name}</h2>

          <p>৳ {item.discountPrice}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={handleDecrease} className="btn btn-sm">
          -
        </button>

        <span>{item.quantity}</span>

        <button onClick={handleIncrease} className="btn btn-sm">
          +
        </button>

        <button onClick={handleDelete} className="btn btn-error btn-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
