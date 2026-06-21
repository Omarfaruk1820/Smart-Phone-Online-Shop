import { useState } from "react";
import axios from "axios";

/* ---------------- PHONE FORM ---------------- */
const PhoneForm = ({ onSubmit, handleChange, form }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Phone Name"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="brand"
        placeholder="Brand"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="model"
        placeholder="Model"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="discountPrice"
        placeholder="Discount Price"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="stock"
        placeholder="Stock"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="textarea textarea-bordered w-full"
        onChange={handleChange}
      />

      <button className="btn btn-primary w-full">Add Phone</button>
    </form>
  );
};

/* ---------------- ACCESSORY FORM ---------------- */
const AccessoryForm = ({ onSubmit, handleChange }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        name="name"
        placeholder="Accessory Name"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="brand"
        placeholder="Brand"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category (Earbuds/Watch etc)"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="oldPrice"
        placeholder="Old Price"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="discount"
        placeholder="Discount %"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="stock"
        placeholder="Stock"
        className="input input-bordered w-full"
        onChange={handleChange}
      />
      <input
        name="image"
        placeholder="Image URL"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <input
        name="warranty"
        placeholder="Warranty"
        className="input input-bordered w-full"
        onChange={handleChange}
      />

      <button className="btn btn-secondary w-full">Add Accessory</button>
    </form>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */

const AddProduct = () => {
  const [type, setType] = useState("phone");

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "phone") {
        await axios.post("https://smart-phone-online-shop-by-node.vercel.app/api/phones", form);
        alert("Phone Added!");
      } else {
        await axios.post("https://smart-phone-online-shop-by-node.vercel.app/api/accessories", form);
        alert("Accessory Added!");
      }

      setForm({});
    } catch (error) {
      console.log(error);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-base-200 rounded-xl">
      {/* TYPE SELECT */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="select select-bordered w-full mb-5"
      >
        <option value="phone">Phone</option>
        <option value="accessory">Accessory</option>
      </select>

      {/* CONDITIONAL FORM */}
      {type === "phone" ? (
        <PhoneForm
          onSubmit={handleSubmit}
          handleChange={handleChange}
          form={form}
        />
      ) : (
        <AccessoryForm onSubmit={handleSubmit} handleChange={handleChange} />
      )}
    </div>
  );
};

export default AddProduct;
