import { Outlet } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Footer from "../Home/Footer";

const LayOut = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default LayOut;
